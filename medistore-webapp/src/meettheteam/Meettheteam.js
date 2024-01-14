import React from 'react';
import Card from 'react-bootstrap/Card';
import './MeetTheTeam.css';

const TeamPage = () => {
    const teamMembers = [
        {
            name: 'Cam Wian',
            major: 'Junior RBE',
            role: 'Gantry Development Head',
            linkedin: 'https://www.linkedin.com/in/cameron-wian-34683622b/',
            imageUrl: '/cam-profile.png',
        },
        {
            name: 'Sam Markwick',
            major: 'Junior RBE',
            role: 'Computer Solutions Expert',
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
            role: 'Assistant Technician',
            linkedin: 'https://www.linkedin.com/in/joshua-barney-033b64209/',
            imageUrl: 'josh-profile.png',
        },
        // Add other team members here
    ];

    const TeamMember = ({ name, major, role, linkedin, imageUrl }) => {
        return (
            <Card className="team-member-card">
                <div className="card-image">
                    <Card.Img variant="top" src={imageUrl} alt={`Profile of ${name}`} className="card-image" />
                </div>
                <Card.Body>
                    <Card.Title className="card-title">{name}</Card.Title>
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
