
let url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
function dropdownMenu() {
    // Use D3 to select the dropdown menu
    let dropdown = d3.select("#selDataset");

    d3.json(url).then(function(data) {
        console.log(data);

        let names = data.names

        names.forEach(element => dropdown.append("option").text(element));
        table(names[0])
        createBarChart(names[0]);
        createBubbleChart(names[0]);
    });

}


function table(input_id){
    let table_tag = d3.select("#sample-metadata");

    d3.json(url).then(function(data) {
        console.log(data);

        let meta_data = data.metadata
        let meta_result = meta_data.filter(x => x.id == input_id)[0];
        table_tag.html("")

        Object.entries(meta_result).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
           
            table_tag.append("h5").text(` ${key}: ${value}`)
          });

      
    });



}

dropdownMenu()

// Function to create the bar chart
function createBarChart(input_id) {
 
    d3.json(url).then(function(data) {
    let samples_data = data.samples
    let sample_result = samples_data.filter(x => x.id == input_id)[0];
  
    var trace = {
      x: sample_result.sample_values.slice(0, 10).reverse(),
      y: sample_result.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: sample_result.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
    };
  
    var layout = {
      title: "Top 10 OTUs",
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    Plotly.newPlot("bar", [trace], layout);
});
  }
  

  function createBubbleChart(input_id) {

    d3.json(url).then(function(data) {
    let samples_data = data.samples
    let sample_result = samples_data.filter(x => x.id == input_id)[0];
  
    var trace = {
      x: sample_result.otu_ids,
      y: sample_result.sample_values,
      text: sample_result.otu_labels,
      mode: "markers",
      marker: {
        size: sample_result.sample_values,
        color: sample_result.otu_ids,
        colorscale: "Earth"
      }
    };
  
    var layout = {
      title: "OTU IDs vs. Sample Values",
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };
  
    Plotly.newPlot("bubble", [trace], layout);
});
  }
  

  function optionChanged(input_id) {
    d3.json(url).then(function(data) {
   
      createBarChart(input_id);
      createBubbleChart(input_id);
      table(input_id)
        

    });
  }