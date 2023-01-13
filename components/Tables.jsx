import React, {useEffect, useState} from "react";
import axios from 'axios'

// "cpu_power": 5.666,
//   "cpu_percent": 43.4,
//   "running_process_power": [
//     {
//       "pid": 0,
//       "name": "System Idle Process",
//       "process_cpu_percent": 2.301,
//       "power": 5.658260244000001
//     },

const cpus = [
  {
    "pid": "127",
    "name": "Chrome",
    "process_cpu_percent": "22%",
    "power": "30",
  },
];

export default function Tables() {

  const [state, setState] = useState({cpu_power: 11.837, cpu_percent: 48.5})
  const [cpuData, setCpuState] = useState(cpus)
 
// http://127.0.0.1:8000/powers
  useEffect(() => {
    setInterval(()=>{
      axios(`http://54.167.64.55/powers/`).then(({data}, err)=>{
        const {cpu_power, cpu_percent, running_process_power} = data
        setState({cpu_power, cpu_percent})
        setCpuState(running_process_power)
      })
    }, 10000)
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className=" mt-10 text-xl font-semibold text-gray-900">
            Total CPU Percentage : {state?.cpu_percent} %
          </h1>
          <h1 className=" mt-10 text-xl font-semibold text-gray-900">
            Total CPU-Power : {state?.cpu_power} Watt
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            This is the description of all cpu details
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      PD
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CPU%
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      CPU Power
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {cpuData.map((cpu) => (
                    <tr key={cpu.cpupercent}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {cpu["pid"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cpu["name"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cpu["process_cpu_percent"]}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {cpu["power"]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
