// TeamPage.js
import React from 'react';
import Card from 'react-bootstrap/Card';
import './MeetTheTeam.css'

const TeamPage = () => {
    const teamMembers = [
        {
            name: 'Cam Wian',
            major: 'Junior RBE',
            role: 'Head Manufacturer',
            linkedin: 'https://www.linkedin.com/in/cameron-wian-34683622b/',
            imageUrl: '/cam-profile.png',
        },
        {
            name: 'Sam Markwick',
            major: 'Junior RBE',
            role: 'Lead Robot Technician',
            linkedin: 'https://www.linkedin.com/in/samuel-markwick-313511224/',
            imageUrl: '/sam-profile.jpg',
        },
        {
            name: 'Luke Foley',
            major: 'Senior CS',
            role: 'Lead Web Developer',
            linkedin: 'https://www.linkedin.com/in/luke-foley-9006ba205/',
            imageUrl: '/luke-profile.jpg',
        },
        {
            name: 'Josh Barney',
            major: 'Senior ME',
            role: 'Assistant Manufacturer',
            linkedin: 'https://www.linkedin.com/in/joshua-barney-033b64209/',
            imageUrl: 'josh-profile.png',
        },
    ];

    const TeamMember = ({ name, major, role, linkedin, imageUrl }) => {
        return (
            <Card style={{ width: '20rem', margin: '1rem', marginTop: '2rem', backgroundColor: 'rgb(43,48,53)', color: 'white', border: '1px solid black' }}>
                <div style={{ overflow: 'hidden', borderRadius: '50%' }}>
                    <Card.Img variant="top" src={imageUrl} alt={`Profile of ${name}`} style={{ borderRadius: '50%', width: "18rem", marginTop: "1rem", border: "1px solid black", width: "18rem", height: "18rem", objectFit: 'cover' }} />
                </div>
                <Card.Body>
                    <Card.Title style={{ fontWeight: 'bold' }}>{name}</Card.Title>
                    <Card.Text>{`${major}`}</Card.Text>
                    <Card.Text>{`${role}`}</Card.Text>
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-light" style={{ color: "rgb(80, 150, 250", fontWeight: "bold" }}>
                        LinkedIn
                    </a>
                </Card.Body>
            </Card>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
            {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
            ))}
        </div>
    );
};

export default TeamPage;
