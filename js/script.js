async function logJSONData() {
    const response = await fetch("../data.json");
    const jsonData = await response.json();
    console.log(jsonData);
  }


  fetch("../data.json")
.then(res => res.json())
.then(data => console.log(data))