import { useState } from 'react';
import axios from 'axios';
import './App.css';



function App() {
  const [logTime, setLogTime] = useState<string>('');
  const [employeeDeviceId, setEmployeeDeviceId] = useState<string>('');
  const [logType, setLogType] = useState<string>(''); 
  const [setData] = useState<any>(null);


  const handleButtonClick = async () => {
    try {
      const response = await axios.post(
        'https://hrms-heliverse.onrender.com/checkin/autoCheckin',
        {
          log_type: logType,
          log_time: new Date(logTime).toISOString(),
          user_device_id: employeeDeviceId,
        }
      );
      setData(response.data)
    } catch (error : any) {
      setData(error.response.data)
      console.log(error);
    }
  };
  

  console.log("logTime", logTime)
  console.log("employeeDeviceId", employeeDeviceId)
  console.log("logType", logType)

  return (
    <div className="container mx-auto mt-10">

      <h1 className="text-6xl mb-7 text-center">Create Checkin</h1>

      <div className="flex space-x-4">

        <label htmlFor='dtr' >Format - YYYY-MM-DDTHH:MM:SS </label>
        <input
          id='dtr'
          type="text"
          className="border p-2"
          placeholder="Log Time"
          value={logTime}
          onChange={(e) => setLogTime(e.target.value)}
        />

  
        <input
          type="text"
          placeholder="Employee Device ID"
          className="border p-2"
          value={employeeDeviceId}
          onChange={(e) => setEmployeeDeviceId(e.target.value)}
        />

        <select
          className="border p-2"
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
        >
          <option value="" disabled>Select log type</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>


        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={handleButtonClick}
        >

          Create Checkin
        </button>
      </div>
      
    </div>
  );
}

export default App;
