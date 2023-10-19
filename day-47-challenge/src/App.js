export default function App() {
  const recipient = "example@example.com";
  const salutation = (
    <div className="challenges">
      <div className="challenge1">
        <h2>Dear Stephen</h2>
        <br />
        <p>
          Hi, my name is {getName}, and I would like to introduce myself to you.
          I am applying for the position of React developer.
        </p>
        <br />
        <p>I’ve attached my CV to this email.</p>
        <p>
          You can find details of my previous roles, experience, and
          achievements.
        </p>
        <p>I’m particularly proud of :</p>
        <ul id="my-achievements">
          <li className="In-achievement">Android Developer</li>
          <li>Fullstack Developer</li>
          <li>Maintenance Technician</li>
        </ul>
        <p>
          I’m excited about this opportunity and would love to know more about
          the process, including timelines for you to decide on interviews.
        </p>
        <br />
        <span>Best regards,</span>
        <br />
        <span>{evenOrOddName()}</span>
        <br />
        <b>{getCurrentDate()}</b>
      </div>
      <div className="challenge2">
        <h1 id="id1">Hi {getFirstName()}</h1>
        <p className="p1">
         {p1()}
        </p>
        <p className="p2">
        {p2()}
        </p>
        <p className="p3">
        {p3()}
        </p>
        <p className="p4">
        {p4()}
        </p>
        <p className="p5">
        {p5()}
        </p>
        <span id="id2">Thank You,</span>
        <h1 id="id3">{getName()}</h1>
      </div>
    </div>
  );
  return salutation;
}

function getFirstName() {
  return "Mohammed ";
}

function getName() {
  return "Mohammed Kotbi";
}

function getCurrentDate() {
  let today = new Date();
  let date =
    today.getDate() +
    "-" +
    parseInt(today.getMonth() + 1) +
    "-" +
    today.getFullYear();

  return date;
}

function evenOrOddName() {
  const today = new Date();
  if (today.getMinutes % 2 === 0) {
    return "Mohammed";
  } else {
    return "Kotbi";
  }
}

function surgieHours() {
  return "8 Hours"
}

function p1() {
  return "I wanted to let you know as soon as possible that I will be staying home from work today."
}
function p2() {
  return "Unfortunately, I developed a stomach bug that has made it very difficult to get work done."
}
function p3() {
  return "I went to urgent care last night and was told it should subside within" + surgieHours + " hours. I do not expect to be online throughout the day."
}
function p4() {
  return "While I do plan to be back in the office tomorrow, I’ve asked Kelly to take over for me today in case any emergencies arise. I had an important call scheduled with a supplier, but Daniel has agreed to manage the meeting."
}
function p5() {
  return "Please let me know of any additional steps you’d like me to take to ensure the day runs as smoothly as possible in my absence."
}

