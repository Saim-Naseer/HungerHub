// Wrapping the App with Router to use useLocation in App component
const AppWithRouter = () => (
    <Router>
      <App />
    </Router>
  );
  
  export default AppWithRouter;