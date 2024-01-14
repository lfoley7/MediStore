import React from 'react';

const ProjectSummary = () => {
  const summaryStyle = {
    width: '90%',
    margin: 'auto',
  };

  return (
    <div style={summaryStyle}>
      <h2 style={{ marginTop: '3rem', marginBottom: '2rem' }}>Project Summary</h2>
      <p>
        Welcome to our revolutionary project designed for the 2024 GoatHacks competition! As proud members of the Beta Theta Pi fraternity, we embarked on a journey to create an innovative robotic medication dispensing system. This system combines advanced technologies, 3D modeling, and laser-cutting to bring forth a cutting-edge solution for managing and dispensing medications.
      </p>
      <p>
        The core functionality of our project lies in a robot equipped with a gantry system. Users can easily select their required medication through our user-friendly website. Once chosen, the robot seamlessly retrieves the medication from a specialized cabinet, streamlining the entire medication retrieval process.
      </p>
      <p>
        Our website's dashboard serves as the central hub for users to interact with the system. It provides a clear overview of the upcoming three medications that need to be taken, ensuring users stay informed about their medication schedules. The storage system's status is visualized through a table, offering real-time insights into the availability of medications in each designated space.
      </p>
      <p>
        To enhance user experience, we implemented a calendar feature that keeps track of upcoming medication schedules. Users can easily reference the calendar to stay on top of their medication routines, promoting better adherence and health outcomes.
      </p>
      <p>
        The analytics section of our website offers a deep dive into medication usage patterns. Visualizations include a medication accuracy doughnut chart, accuracy by day bar chart, dosage over time stepped line chart, and a medicine access frequency bar chart. These charts provide valuable insights, empowering users to make informed decisions about their medication management.
      </p>
      <p>
        Explore additional sections on our website, including a comprehensive "About" page that delves into the technical details and inspiration behind our project. Our "Meet the Team" page introduces the talented individuals who contributed to this innovation, highlighting their dedication and expertise. For those interested in the technical aspects, we provide a direct link to our GitHub repository, offering transparency and openness about our project's development.
      </p>
      <p>
        In conclusion, our robotic medication dispensing system is not just a solution; it's a testament to the power of collaboration, innovation, and technology. We are excited to share our project with the world, and we believe it has the potential to revolutionize how medications are managed and accessed.
      </p>
    </div>
  );
};

export default ProjectSummary;
