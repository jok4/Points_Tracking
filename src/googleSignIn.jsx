// const initializeGoogleSignIn = () => {
//     return new Promise((resolve, reject) => {
//       const handleClientLoad = () => {
//         window.gapi.load('auth2', () => {
//           window.gapi.auth2
//             .init({
//               client_id: import.meta.env.VITE_CLIENT_ID,
//             })
//             .then(() => {
//               resolve();
//             })
//             .catch((error) => {
//               reject(error);
//             });
//         });
//       };
  
//       const script = document.createElement('script');
//       script.src = 'https://accounts.google.com/gsi/client';
//       script.async = true;
//       script.defer = true;
//       script.onload = handleClientLoad;
//       script.onerror = reject;
  
//       document.head.appendChild(script);
//     });
//   };

const initializeGoogleSignIn = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
  
      script.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2
            .init({
              client_id: import.meta.env.VITE_CLIENT_ID,
            })
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error);
            });
        });
      };
  
      script.onerror = () => {
        reject(new Error('Failed to load Google Sign-In script.'));
      };

      window.myFunc = () => {
        document.head.appendChild(script);
      }
  
    });
  };
  
  
  const handleGoogleSignIn = () => {
    return new Promise((resolve, reject) => {
      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then((googleUser) => {
          const idToken = googleUser.getAuthResponse().id_token;
          resolve(idToken);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  export { initializeGoogleSignIn, handleGoogleSignIn };
  