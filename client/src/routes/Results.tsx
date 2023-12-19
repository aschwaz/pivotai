import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';

const Results = () => {
    const location = useLocation();
    const [skillData, setSkillData] = useState(location.state?.skillData);

    useEffect(() => {
        // If there's no skillData from the location state, fetch it from the backend
        if (!skillData) {
            axios.get('/results')
                .then(response => {
                    // Assuming the backend sends the data in the format suitable for the radar chart
                    setSkillData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching results:', error);
                });
        }
    }, [skillData]);

    const radarData = {
        labels: ['Engineering', 'Design', 'Business'],
        datasets: [
            {
                label: 'User Skills',
                backgroundColor: 'rgba(34, 202, 236, .2)',
                borderColor: 'rgba(34, 202, 236, 1)',
                pointBackgroundColor: 'rgba(34, 202, 236, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(34, 202, 236, 1)',
                data: skillData ? [skillData.engineering, skillData.design, skillData.business] : [0, 0, 0]
            }
        ]
    };

    return (
        <div style={{ width: '50%', margin: 'auto', marginTop: '30px' }}>
            <h1>User Skill Graph</h1>
            {skillData && <Radar data={radarData} />}
        </div>
    );
};

export default Results;
