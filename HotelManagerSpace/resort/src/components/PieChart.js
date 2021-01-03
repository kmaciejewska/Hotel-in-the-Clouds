import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import Title from "./Title";

class PieChart extends Component{
  constructor(props) {
      super(props);
      this.state = {
          chartData: {
            labels: ['Excellent', 'Good', 'Satisfactory', 'Poor', 'Very poor'],
            datasets:[
                {
                    label: 'Customer satisfaction level',
                    data:[ 65, 20, 10, 4, 1],
                    backgroundColor:[ '#3C6BA6', '#5F97D6', '#78ABED', '#B8D7FF', '#EAF3FD'],
                    labels: ['Excellent', 'Good', 'Satisfactory', 'Poor', 'Very poor']
                }
            ],
        }
        
      }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

  render(){
    return (
      <section className="bgComponent">
          <div className="component">
            <Title title="Customer satisfaction level"/>
            <article className="charts">
                <Pie width="800px" height="350px" data={this.state.chartData} label={this.state.chartData.labels} options={{
                    legend: {
                        display: true,
                        position: this.props.legendPosition
                      
                    },
                    tooltips: {
                        callbacks: {
                          label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat((currentValue/total*100).toFixed(1));
                            return ' ' + percentage + '%';
                          }
                        }
                      }
                }}>
                </Pie>
          </article>
          </div>
      </section>
    );
  }
}

export default PieChart;
