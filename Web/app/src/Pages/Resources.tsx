const Resources = () => {
  const resources = [
    {
      name: "Space Apps 2024 Seismic Detection Data Packet",
      description: "Download the seismic detection data for Space Apps 2024.",
      link: "https://wufs.wustl.edu/SpaceApps/data/space_apps_2024_seismic_detection.zip",
      source: "wufs.wustl.edu",
    },
    {
      name: "Mars InSight Seismic Data Information Sheet",
      description: "Information sheet about Mars InSight seismic data.",
      link: "https://pds-geosciences.wustl.edu/insight/urn-nasa-pds-insight_seis/readme.txt",
      source: "pds-geosciences.wustl.edu",
    },
    {
      name: "European Space Agency (ESA): Planetary Science Archive",
      description: "Access planetary science data from the European Space Agency.",
      link: "https://psa.esa.int/psa/#/pages/home",
      source: "psa.esa.int",
    },
    {
      name: "Canadian Space Agency (CSA): Earthquakes Canada Insights by Natural Resources Canada",
      description: "Insights on earthquakes in Canada by Natural Resources Canada.",
      link: "https://www.earthquakescanada.nrcan.gc.ca/index-en.php",
      source: "earthquakescanada.nrcan.gc.ca",
    },
    {
      name: "Earth Seismogram Viewer",
      description: "View seismograms from Earthquake Canada's data.",
      link: "https://www.earthquakescanada.nrcan.gc.ca/stndon/wf-fo/index-en.php",
      source: "earthquakescanada.nrcan.gc.ca",
    },
  ];

  // Define the single download link for all resources
  const downloadLink = "https://drive.google.com/drive/folders/1Vwm9yxesyDtALWzMx8F0zW82qXLuLFaT?usp=sharing"; // Replace with the actual Google Drive link

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gradient-to-r from-black via-blue-900 to-black text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Seismic Detection Resources
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resources.map((resource, index) => (
          <div
            key={index}
            className="p-6 bg-gradient-to-r from-purple-900 via-gray-800 to-blue-900 shadow-lg rounded-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-2xl font-semibold mb-3 text-purple-300">{resource.name}</h2>
            <p className="mb-4 text-gray-300">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-pink-400 hover:underline transition duration-200"
            >
              {resource.source}
            </a>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a
          href={downloadLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          Download All Resources
        </a>
      </div>
    </div>
  );
};

export default Resources;
