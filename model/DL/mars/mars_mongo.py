import pandas as pd
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Load the CSV file into a pandas DataFrame
csv_file_path = "C:/Users/nm_ma/Desktop/Kampana/model/DL/mars/catlog/detected_seismic_events.csv"
df = pd.read_csv(csv_file_path)

# Check the original columns
print("Original DataFrame Columns:", df.columns.tolist())

# Clean the column names
df.columns = df.columns.str.strip().str.replace('(%Y-%m-%dT%H:%M:%S.%f)', '', regex=False).str.replace('(sec)', '', regex=False).str.strip()

# Check cleaned column names
print("Cleaned DataFrame Columns:", df.columns.tolist())

# Select only the specified columns
required_columns = ['filename', 'time_abs', 'velocity', 'sta_lta_ratio']
if not all(col in df.columns for col in required_columns):
    raise ValueError(f"Some required columns are missing in the DataFrame: {required_columns}")

# Selecting only the required columns
df = df[required_columns]

# Convert 'time_abs' to the specified format
df['time_abs'] = pd.to_datetime(df['time_abs'], errors='coerce').dt.strftime('%Y-%m-%dT%H:%M:%S.%f')

# Handle any rows where 'time_abs' could not be converted
if df['time_abs'].isnull().any():
    print("Warning: Some 'time_abs' values could not be converted. They will be set to NaT.")
    df = df.dropna(subset=['time_abs'])  # Drop rows with NaT values if desired

# Connect to MongoDB
MongoURI = os.getenv('MONGO')
if not MongoURI:
    raise ValueError("MONGO environment variable is not set")

client = MongoClient(MongoURI)

# Initialize the database and collection
db = client['test']
collection_name = 'mars_seismic_events'
collection = db[collection_name]

# Explicitly create the collection if it does not exist
if collection_name not in db.list_collection_names():
    db.create_collection(collection_name)

# Insert data into the MongoDB collection
try:
    collection.insert_many(df.to_dict('records'))
    print("Data inserted successfully!")
except Exception as e:
    print(f"An error occurred while inserting data: {e}")
