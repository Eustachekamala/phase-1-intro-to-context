// Your code here
function createEmployeeRecord(employeeData) {
  const [firstName, familyName, title, payPerHour] = employeeData;

  // Validate data types (optional)
  // You can add checks for each element to ensure they are of the expected type (String, Number)

  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [], // Initialize empty array for time in events
    timeOutEvents: [], // Initialize empty array for time out events
  };
}

function createEmployeeRecords(employeeDataArray) {
  const employeeRecords = [];
  for (const employeeData of employeeDataArray) {
    const employeeRecord = createEmployeeRecord(employeeData);
    employeeRecords.push(employeeRecord);
  }

  return employeeRecords;
}

function createTimeInEvent(employeeRecord, timeStamp) {
  const event = {
    type: "TimeIn",
    hour: parseInt(timeStamp.substring(11, 13)),
    date: timeStamp.substring(0, 10),
  };

  employeeRecord.timeInEvents.push(event);
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timestamp) {
  const event = {
    type: "TimeOut",
    hour: parseInt(timestamp.substring(11, 13)),
    date: timestamp.substring(0, 10),
  };

  employeeRecord.timeOutEvents.push(event);
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, targetDate) {
  let totalHours = 0;
  for (const event of employeeRecord.timeInEvents) {
    if (event.date === targetDate) {
      const timeIn = parseInt(event.hour);

      // Find matching time-out event
      const matchingTimeOut = employeeRecord.timeOutEvents.find(
        (timeOutEvent) => timeOutEvent.date === targetDate
      );

      if (matchingTimeOut) {
        const timeOut = parseInt(matchingTimeOut.hour);
        const hoursWorked = Math.abs(timeOut - timeIn);  // Handle negative differences
        totalHours += hoursWorked;
      }
    }
  }

  return totalHours;
}

function wagesEarnedOnDate(employeeRecord, targetDate) {
  const hoursWorked = hoursWorkedOnDate(employeeRecord, targetDate);
  const payRate = employeeRecord.payPerHour;

  const wages = hoursWorked * payRate;
  return wages;
}

function allWagesFor(employeeRecord) {
  const uniqueDates = new Set();

  // Gather unique dates from timeInEvents
  for (const event of employeeRecord.timeInEvents) {
    uniqueDates.add(event.date);
  }

  let totalWages = 0;
  for (const date of uniqueDates) {
    const wagesEarned = wagesEarnedOnDate(employeeRecord, date);
    totalWages += wagesEarned;
  }

  return totalWages;
}

function calculatePayroll(employeeRecords) {

  let totalPayroll = 0;
  for (const employeeRecord of employeeRecords) {
    const employeeWages = allWagesFor(employeeRecord);
    totalPayroll += employeeWages;
  }

  return totalPayroll;
}