import { useState } from 'react';
import axios from 'axios';
import './App.css';



function App() {

  
  const [logTime, setLogTime] = useState<string>('');
  const [employeeDeviceId, setEmployeeDeviceId] = useState<string>('');
  const [employeeId, setEmployeeId] = useState<string>('');
  const [logType, setLogType] = useState<string>(''); 
  const [token, setToken] = useState<string>('');
  const [_ , setData] = useState<any>(null);


  const handleButtonClick = async () => {
    try {
      console.log(
        logTime,
        employeeDeviceId,
        employeeId,
        logType
      );

      if(employeeId !== ''){
        const response = await axios.post(
          'https://hrms-heliverse.onrender.com/checkin/autoCheckin',
          {
            log_type: logType,
            log_time: new Date(logTime).toISOString(),
            user_id: employeeId
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : 'Bearer ' + token
            }
          }
        );
        setData(response.data)
      }else{

      const response = await axios.post(
        'https://hrms-heliverse.onrender.com/checkin/autoCheckin',
        {
          log_type: logType,
          log_time: new Date(logTime).toISOString(),
          user_device_id: employeeDeviceId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
          }
        }
      );
      console.log(response)
      // setData(response.data)
      }
    } catch (error : any) {
      setData(error)
      console.log(error);
    }
  };
  
  const handleGenerateToken = async () => {
    try {
      const response = await axios.post(
        'https://hrms-heliverse.onrender.com/auth/login',
        {
          "email": "admin@heliverse.com",
          "password": "admin"
        }
      )
      console.log(response)
      setToken(response.data.access_token)
    } catch (error : any) {
      setData(error)
      console.log(error);
    }
  }

  const handleTimeGenerate = async () => {
    try {
      setLogTime(new Date().toISOString())
    } catch (error : any) {
      setData(error)
      console.log(error);
    }
  }

  console.log("logTime", logTime)
  console.log("employeeDeviceId", employeeDeviceId)
  console.log("logType", logType)

  return (
    <div className="container mx-auto mt-10">

      <h1 className="text-6xl mb-7 text-center">Create Checkin</h1>

      <div className="flex space-x-4 flex-col gap-10">

        <label htmlFor='dtr' >Format - YYYY-MM-DDTHH:MM:SS </label>
        <input
          id='dtr'
          type="text"
          className="border p-2"
          placeholder="Log Time"
          value={logTime}
          onChange={(e) => setLogTime(e.target.value)}
        />

        <div className='flex flex-row justify-center items-center gap-2'>

     
        <input
          type="text"
          placeholder="Employee Device ID"
          className="border p-2"
          value={employeeDeviceId}
          onChange={(e) => setEmployeeDeviceId(e.target.value)}
        />
        OR
        <input
          type="text"
          placeholder="Employee ID"
          className="border p-2"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
           </div>
        <select
          className="border p-2"
          value={logType}
          onChange={(e) => setLogType(e.target.value)}
        >
          <option value="" disabled>Select log type</option>
          <option value="IN">IN</option>
          <option value="OUT">OUT</option>
        </select>

        <input
          type="text"
          placeholder="Token"
          className="border p-2"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <div className='flex flex-row gap-2 justify-center items-center'>
          <button
            className="bg-red-500 text-white p-2 rounded"
            onClick={handleButtonClick}
          >

            Create Checkin
          </button>

          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleGenerateToken}
          >

            Generate Token
          </button>


          <button
            className="bg-blue-500 text-white p-2 rounded"
            onClick={handleTimeGenerate}
          >

            Generate Time
          </button>          


        </div>

      </div>
      
    </div>
  );
}

export default App;
