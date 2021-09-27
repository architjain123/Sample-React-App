import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import OverallGraph from './components/OverallGraph'
import { render } from 'react-dom'
import BusinessGraph from './components/BusinessGraph';
import PostalGraph from './components/PostalGraph';
import NaicsGraph from './components/NaicsGraph';



function App() {
  return (

    <Router>
      <div>
        <Route path="/overall" component={OverallGraph}></Route>
        <Link to="/overall">Overall</Link>
        <Route path="/business" component={BusinessGraph}></Route>
        <Link to="/business">Business</Link>
        <Route path="/naics" component={NaicsGraph}></Route>
        <Link to="/naics">NAICS</Link>
        <Route path="/postal" component={PostalGraph}></Route>
        <Link to="/postal">POSTAL</Link>
      </div>
    </Router>

    // <Router>
    //   <div className="container">
    //     <Header onAdd={()=>setShowAdd(!showAdd)} showAdd={showAdd}/>
    //     <Route path="/" exact render={(props) => (
    //       <>
    //         {showAdd && <AddTask onAdd={addTask}/>}
    //         {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>) : ("No Tasks to show") }
    //       </>
    //     )}></Route>
    //     <Route path="/about" component={About}></Route>
    //     <Footer/>
    //   </div>
    // </Router>
  );
}

export default App;
