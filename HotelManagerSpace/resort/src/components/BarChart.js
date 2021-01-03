import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import Title from "./Title";

class BarChart extends Component{
  constructor(props) {
      super(props);
      this.state = {
          chartData:{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets:[
                  {
                    label: 'Number of check-ins in 2020',
                    data:[ 125, 60, 80, 95, 180, 170, 190, 200, 240, 120, 50, 90],
                    backgroundColor:[ '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5',
                      '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5']
                  }
              ]
          }
      }
      
      this.change0 = this.change0.bind(this);
      this.change1 = this.change1.bind(this);
      this.change2 = this.change2.bind(this);
    }

  componentDidMount() {
    this.change2();
   }

  change0(){
    this.setState({
      chartData:{
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
              datasets:[
                  {
                      label: 'Number of check-ins in 2018',
                      data:[ 25, 20, 30, 35, 60, 100, 150, 150, 140, 90, 20, 50],
                      backgroundColor:[ '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5',
                        '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5']
                  }
              ]
            }
    })
  }

    change1(){
      this.setState({
        chartData:{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                  datasets:[
                      {
                          label: 'Number of check-ins in 2019',
                          data:[ 65, 50, 70, 95, 90, 150, 180, 130, 120, 110, 50, 20],
                          backgroundColor:[ '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5',
                            '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5']
                      }
                  ]
          }
      })
    }

  change2(){
    this.setState({
        chartData:{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                  datasets:[
                      {
                          label: 'Number of check-ins in 2020',
                          data:[ 125, 60, 80, 95, 180, 170, 190, 200, 240, 120, 50, 90],
                          backgroundColor:[ '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5',
                            '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5', '#6FA3E5']
                      }
                  ]
          }
    })
  }


 static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'bottom'
 }


  render(){
    return (
      <section className="bgComponent">
          <div className="component">
            <Title title="Number of Check-ins"/>
            <article className="charts">
                <Bar width="800px" height="350px" data={this.state.chartData} options={{
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
                </Bar>
          </article>
          <button onClick={this.change0} className="btn-statistics">2018</button>
          <button onClick={this.change1} className="btn-statistics">2019</button>
          <button onClick={this.change2} className="btn-statistics">2020</button>
          </div>
      </section>

    );
  }
}

export default BarChart;