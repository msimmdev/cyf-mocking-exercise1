import https from "https";

function fetchFromAPI(url) {
  return new Promise((resolve, reject) => {
    // Define options for the HTTPS request, including headers
    const options = {
      headers: {
        Accept: "application/json",
      },
    };

    // Create the HTTPS GET request with headers
    const req = https.get(url, options, (res) => {
      // Handle HTTP errors
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error("StatusCode=" + res.statusCode));
      }

      let data = "";

      // Receive data chunks
      res.on("data", (chunk) => {
        data += chunk;
      });

      // On end, resolve the promise with the data
      res.on("end", () => {
        try {
          // Parse JSON data
          const parsedData = JSON.parse(data);
          resolve(parsedData);
        } catch (e) {
          reject(e);
        }
      });
    });

    // Handle request errors
    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
}

async function getCatFacts() {
  const response = await fetchFromAPI("https://catfact.ninja/facts");
  return response["data"];
}

export { getCatFacts };
