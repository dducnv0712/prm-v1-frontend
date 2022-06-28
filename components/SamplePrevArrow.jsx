import {ChevronLeftIcon } from '@heroicons/react/outline';
function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className="p-2 flex bg-white justify-center shadow items-center absolute -left-7 z-20 rounded-full top-1/2" onClick={onClick}>
            <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
    );
  }
  export default SamplePrevArrow