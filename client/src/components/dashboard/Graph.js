import React, {Fragment, useState, useEffect} from 'react';
import {Line, Bar} from 'react-chartjs-2';
import PropTypes from 'prop-types';

const Graph = ({patient}) => {
    const [chartData, setChartData] = useState([]);

    const chart = () => {
        const patientData = [];
        const jan = [0];
        const feb = [0];
        const mar = [0];
        const apr = [0];
        const may = [0];
        const jun = [0];
        const jul = [0];
        const aug = [0];
        const sep = [0];
        const oct = [0];
        const nov = [0];
        const dec = [0];
    
        patient.forEach(pat => {
            if(new Date(pat.date).getMonth() === 0) {
                return jan.push(jan[0]+1);
            } else if(new Date(pat.date).getMonth() === 1) {
                return feb.push(feb[0]+1); 
            } else if(new Date(pat.date).getMonth() === 2) {
                return mar.push(mar[0]+1);
            } else if(new Date(pat.date).getMonth() === 3) {
                return apr.push(apr[0]+1);
            } else if(new Date(pat.date).getMonth() === 4) {
                return may.push(may[0]+1);
            } else if(new Date(pat.date).getMonth() === 5) {
                return jun.push(jun[0]+1);
            } else if(new Date(pat.date).getMonth() === 6) {
                return jul.push(jul[0]+1);
            } else if(new Date(pat.date).getMonth() === 7) {
                return aug.push(aug[0]+1);
            } else if(new Date(pat.date).getMonth() === 8) {
                return sep.push(sep[0]+1);
            } else if(new Date(pat.date).getMonth() === 9) {
                return oct.push(oct[0]+1);
            } else if(new Date(pat.date).getMonth() === 10) {
                return nov.push(nov[0]+1);
            } else if(new Date(pat.date).getMonth() === 11) {
                return dec.push(dec[0]+1);
            } else {
            }
        });
    
        var janData = jan.reduce( (a, b) => a+b, jan[0]);
        var febData = feb.reduce( (a, b) => a+b, feb[0]);
        var marData = mar.reduce( (a, b) => a+b, mar[0]);
        var aprData = apr.reduce( (a, b) => a+b, apr[0]);
        var mayData = may.reduce( (a, b) => a+b, may[0]);
        var junData = jun.reduce( (a, b) => a+b, jun[0]);
        var julData = jul.reduce( (a, b) => a+b, jul[0]);
        var augData = aug.reduce( (a, b) => a+b, aug[0]);
        var sepData = sep.reduce( (a, b) => a+b, sep[0]);
        var octData = oct.reduce( (a, b) => a+b, oct[0]);
        var novData = nov.reduce( (a, b) => a+b, nov[0]);
        var decData = dec.reduce( (a, b) => a+b, dec[0]);
    
        patientData.push(janData);
        patientData.push(febData);
        patientData.push(marData);
        patientData.push(aprData);
        patientData.push(mayData);
        patientData.push(junData);
        patientData.push(julData);
        patientData.push(augData);
        patientData.push(sepData);
        patientData.push(octData);
        patientData.push(novData);
        patientData.push(decData);
    
        console.log(patientData);
    
        setChartData({
            labels: [
                    "January", 
                    "February", 
                    "March", 
                    "April", 
                    "May", 
                    "June", 
                    "July", 
                    "August", 
                    "September", 
                    "October", 
                    "November", 
                    "December"
                ],
            datasets: [
                {
                    label: "level of patients",
                    data: patientData,
                    borderColor: [
                        "#17a2b8"
                    ],
                    pointBorderColor: [
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                        "#17a2b8",
                    ],
                    borderWidth: 3
                }
            ]
        }); 
    };
    useEffect(() => {
        chart();
    }, []);

    return (
        <Fragment>
            <div className="user-graph">
                            <Line
                                data={chartData}
                                options={{
                                    title: { text: "APPOINTMENTS PER MONTHS", display: true },
                                    labels: {
                                        "fontColor": "#f4f4f4",
                                        "fontWeight": "bold",
                                    },
                                    scales: {
                                    yAxes: [
                                        {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 10,
                                            beginAtZero: true
                                        },
                                        gridLines: {
                                            display: false
                                        }
                                        }
                                    ],
                                    xAxes: [
                                        {
                                        gridLines: {
                                            display: false
                                        }
                                        }
                                    ]
                                    }
                                }}
                            />
                        </div>
        </Fragment>
    );
};

Graph.propTypes = {
    patient: PropTypes.array.isRequired,
}

export default Graph;
