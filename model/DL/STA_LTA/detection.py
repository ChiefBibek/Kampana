import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from scipy.signal import butter, filtfilt
from obspy.signal.trigger import classic_sta_lta

# Preprocessing function for test data
def preprocess_test_data(df):
    # Convert time_abs to datetime
    df['time_abs'] = pd.to_datetime(df['time_abs(%Y-%m-%dT%H:%M:%S.%f)'], format='%Y-%m-%dT%H:%M:%S.%f')
    return df

# Function to normalize the velocity data
def normalize_velocity(df):
    scaler = MinMaxScaler()
    df['normalized_velocity'] = scaler.fit_transform(df[['velocity(m/s)']])
    return df

# Function to apply a Butterworth filter for denoising
def butterworth_filter(df, lowcut=0.1, highcut=3.0, fs=6.625, order=5):
    nyquist = 0.5 * fs
    low = lowcut / nyquist
    high = highcut / nyquist
    if not (0 < low < 1 and 0 < high < 1):
        raise ValueError("Digital filter critical frequencies must be 0 < Wn < 1")
    b, a = butter(order, [low, high], btype='band')
    df['filtered_velocity'] = filtfilt(b, a, df['velocity(m/s)'])
    return df

# Function to calculate STA/LTA ratio using obspy
def calculate_sta_lta(df, sta_len, lta_len, df_rate):
    cft = classic_sta_lta(df['filtered_velocity'], int(sta_len * df_rate), int(lta_len * df_rate))
    return cft

# Function to detect seismic events using STA/LTA method
def detect_seismic_events_sta_lta(df, sta_len=120, lta_len=600, df_rate=6.625, threshold=2.5, min_distance=5000):
    events = []
    # Calculate STA/LTA ratio
    cft = calculate_sta_lta(df, sta_len, lta_len, df_rate)
    
    # Label the data based on STA/LTA threshold
    labels = np.where(cft > threshold, 1, 0)
    print(f"Detected labels: {np.sum(labels)}")
    
    # Detect peaks where STA/LTA ratio exceeds the threshold
    peaks = np.where(labels == 1)[0]
    
    # Filter peaks based on minimum distance
    filtered_peaks = []
    last_peak = -min_distance
    for peak in peaks:
        if peak - last_peak >= min_distance:
            filtered_peaks.append(peak)
            last_peak = peak

    print(f"Filtered peaks: {len(filtered_peaks)}")
    
    # Define a threshold for minimum amplitude
    some_min_amplitude = 1e-8  # Example threshold; adjust this based on your dataset

    for peak in filtered_peaks:
        if peak < len(df):  # Ensure index is within bounds
            # Add additional check for minimum amplitude
            if df['velocity(m/s)'].iloc[peak] > some_min_amplitude:  
                event = {
                    'time_abs': df['time_abs'].iloc[peak],
                    'velocity': df['velocity(m/s)'].iloc[peak],
                    'sta_lta_ratio': cft[peak]
                }
                events.append(event)
    
    return events, filtered_peaks, cft

# Function to detect seismic events in test data
def test_seismic_detection_sta_lta(test_data_dir, sta_len=120, lta_len=600, df_rate=6.625, threshold=2.5, min_distance=5000):
    results = []

    # Loop through each file in the test data directory
    for root, dirs, files in os.walk(test_data_dir):
        for file in files:
            if file.endswith('.csv'):
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                df = pd.read_csv(file_path)

                # Preprocess the test data
                df = preprocess_test_data(df)
                df = butterworth_filter(df, fs=df_rate)
                df = normalize_velocity(df)
                print(f"Filtered and normalized velocity: {df['filtered_velocity'].describe()}")

                # Detect seismic events using STA/LTA method
                events, peaks, cft = detect_seismic_events_sta_lta(df, sta_len, lta_len, df_rate, threshold, min_distance)
                for event in events:
                    event['file'] = file
                    results.append(event)

                # Plot the filtered and normalized velocity signal and detected peaks
                plt.figure(figsize=(12, 6))
                plt.plot(df['time_abs'], df['filtered_velocity'], label='Filtered Velocity')
                plt.plot(df['time_abs'].iloc[peaks], df['filtered_velocity'].iloc[peaks], 'rx', label='Detected Peaks')
                plt.xlabel('Time')
                plt.ylabel('Filtered Velocity')
                plt.title(f'Seismic Event Detection in {file}')
                plt.legend()
                plt.show()

                # Plot the STA/LTA ratio
                plt.figure(figsize=(12, 6))
                plt.plot(df['time_abs'], cft, label='STA/LTA Ratio')
                plt.axhline(y=threshold, color='g', linestyle='--', label='Threshold')
                plt.xlabel('Time')
                plt.ylabel('STA/LTA Ratio')
                plt.title(f'STA/LTA Ratio in {file}')
                plt.legend()
                plt.show()

    return results

# Set the path to your test data directory
test_data_dir = 'C:/Users/nm_ma/Desktop/space_apps_2024_seismic_detection/data/lunar/test/data/S15_GradeA'
detected_seismic_events = test_seismic_detection_sta_lta(test_data_dir, sta_len=120, lta_len=600, df_rate=6.625, threshold=2.5, min_distance=5000)

# Convert results to DataFrame and save to CSV
if detected_seismic_events:
    results_df = pd.DataFrame(detected_seismic_events)
    results_df.to_csv('detected_seismic_events.csv', index=False)
    print("Detected seismic events saved to detected_seismic_events.csv")
else:
    print("No seismic events detected.")