// get sample data endpoiNTS
const sampledata = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
var option_input;
var dataframe;


function init() 
    {
        option_input = 940
        d3.json(sampledata).then(function(data) 
            {
                dataframe = data;
                console.log(dataframe);
                calllMetaData(940,dataframe);
                callHBarChart(940,dataframe);
                callBubbleChart(940,dataframe);
            
                var optionmenu = d3.select("#selDataset");

                dataframe.names.forEach(function(data_name)
                    {
                    optionmenu.append("option").text(data_name); 
                    }); 
            })
    }
        
function mapdata(x,y)
{
return x.map(function(row){
    return row[y];
                          });
}



function optionchange(filtervalue)
    {
        option_input = filtervalue;
        calllMetaData(option_input,dataframe)
        callHBarChart(option_input,dataframe);
        callBubbleChart(option_input,dataframe);
    }

function calllMetaData(option,dataframe)
    {
        var metadata = dataframe.metadata.filter(row => row.id == option);
        d3.select("#sample-metadata").html(object_projection(metadata[0]));
    }   
    
function object_projection(obj) 
    {
            var default_str = "";
            Object.entries(obj).forEach(([key,value]) => {
            default_str += `<br>${key}:${value}</br>`;
            if(key="wfreq"){
            console.log("Gauge Value:" + value);
            }
            });
            return default_str;
    }

function callBubbleChart(option,dataframe)
    {
        var bardata = dataframe.samples.filter(sample => sample.id == option);
        console.log(bardata)

        var x_axis = bardata.map(row => row.otu_ids);
        var y_axis = bardata.map(row => row.sample_values)
        var marker_size = bardata.map(row => row.sample_values);
        var color = bardata.map(row => row.otu_ids);
        var labels = bardata.map(row => row.otu_labels);
   
   
        var trace_a = {
            x:x_axis[0],
            y:y_axis[0],
            text: labels[0],
            mode:"markers",
            marker: {
                color: color[0],
                size: marker_size[0],
                colorscale: "Electric"
            }
        };
        
        var plot_data = [trace_a];
        var layout = {
            xaxis:{
                title: "ID"
            }
        };
        Plotly.newPlot("bubble",plot_data,layout)
    };

function callHBarChart(option,data) 
    {
        var bardata = data.samples.filter(sample => sample.id == option);
        console.log(bardata);

        var y = bardata.map(row => row.otu_ids);
        var y_list = [];

        for(i=0;i<y[0].length;i++){
            y_list.push(`OTU ${y[0][i]}`);
        }
        var x_axis = bardata.map(row =>(row.sample_values));
        var text = bardata.map(row => row.otu_labels);
    
        var trace = {
            x:x_axis[0].slice(0,10),
            y:y_list.slice(0,10),
            text:text[0].slice(0,10),
            type:"bar",
            orientation:"h",
        };

        var data = [trace];

        var layout = {
            yaxis: {
                autorange:"reversed"
            }
        }
    
    
        Plotly.newPlot("bar",data,layout)
    
    
    }

    init();

