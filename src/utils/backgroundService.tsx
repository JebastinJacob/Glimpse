// import React, { useEffect } from 'react';
// import { BackgroundFetch } from 'react-native-background-fetch';

// const BackgroundTask: React.FC = () => {
//   useEffect(() => {
//     BackgroundFetch.configure(
//       {
//         minimumFetchInterval: 15, // minimum interval in minutes
//         stopOnTerminate: false, // continue running after the app is terminated
//         startOnBoot: true, // start when the device boots up
//       },
//       async (taskId) => {
//         // Perform your background task here
//         console.log(`Background task with ID ${taskId} executed`);
//         BackgroundFetch.finish(taskId); // signal task completion
//       },
//     );

//     // Optionally start the task manually (if not using startOnBoot)
//     BackgroundFetch.start();
//   }, []);

//   return (
//     // Your component JSX content (optional)
//   );
// };

// export default BackgroundTask;
