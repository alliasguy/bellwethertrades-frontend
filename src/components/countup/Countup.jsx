import CountUp, { useCountUp } from 'react-countup';
import './countup.css'
export default function Countup({ end}) {
  useCountUp({
    ref: 'counter',
    enableScrollSpy: true,
    scrollSpyDelay: 1000,
  });

  return (
    <div className="count-cont">
      <div  />
      <h1 className='countup-num'>+<CountUp end={end} enableScrollSpy /></h1>
    </div>
  );
}