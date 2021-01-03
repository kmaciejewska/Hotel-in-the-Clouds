import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import Title from "./Title";

class LineChart extends Component{
  constructor(props) {
      super(props);
      this.state = {
          chartData:{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets:[
                  {
                      label: 'Profit',
                      data:[ 2500, 2000, 3000, 3500, 6000, 10000, 15000, 15000, 14000, 9000, 2000, 5000],
                      borderColor: '#6FA3E5',
                      fill: false
                  }
              ]
          }
      }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'bottom',
    }

  render(){
    return (
        <section className="bgComponent">
            <div className="component">
                <Title title="Profit in next months"/>
                <article className="charts">
                    <Line width="800px" height="350px" data={this.state.chartData} options={{
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }}>
                    </Line>
                </article>
            </div>
      </section>
    );
  }
}

export default LineChart;