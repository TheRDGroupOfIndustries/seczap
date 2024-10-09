// "use server";

// import VirusTotalApi from "node-virustotal";
// const virustotal = VirusTotalApi.makeAPI();

// // Replace this with your actual VirusTotal API key
// virustotal.setKey("ee962842c867464c2bc8ca720e03e371c16ef25bad870a4d51911aab6ebf9dab");

// // Function to scan a file
// export const scanFile = async (fileBuffer) => {
//   try {
//     const response = await virustotal.fileScan(fileBuffer);
//     return response;
//   } catch (error) {
//     console.error("Error scanning file:", error);
//     throw error;
//   }
// };

// // Function to scan a URL
// export const scanUrl = async (url) => {
//   try {
//     const response = await virustotal.urlScan(url);
//     return response;
//   } catch (error) {
//     console.error("Error scanning URL:", error);
//     throw error;
//   }
// };

// // Function to get the report for a file or URL scan
// export const getReport = async (resourceId) => {
//   try {
//     const response = await virustotal.fileReport(resourceId);
//     return response;
//   } catch (error) {
//     console.error("Error getting report:", error);
//     throw error;
//   }
// };
