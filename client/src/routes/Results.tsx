import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';

const Results = () => {
    const [data, setData] = useState({
        labels: ['Engineering', 'Design', 'Business'],
        datasets: [
            {
                label: 'User Skills',
                backgroundColor: 'rgba(34, 202, 236, .2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                pointBackgroundColor: 'rgba(34, 202, 236, 1)',
                poingBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
                data: [0, 0, 0, 0, 0, 0] // Placeholder data
            }
        ]
    });

    useEffect(() => {
        // Fetch data from the backend when the component mounts
        axios.get('/api/skill-data')
            .then(response => {
                // Update the state with the fetched data
                setData(prevData => ({
                    ...prevData,
                    datasets: [{
                        ...prevData.datasets[0],
                        data: response.data.skills // Assuming the data is in an array
                    }]
                }));
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div>
            <h1>User Skill Graph</h1>
            {/* <Radar data={data} /> */}
        </div>
    );
};

export default Results;
