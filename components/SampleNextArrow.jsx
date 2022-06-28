
import { ChevronRightIcon } from '@heroicons/react/outline';
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <button className="p-2 flex bg-white justify-center shadow items-center absolute -right-7 rounded-full top-1/2" onClick={onClick}>
            <ChevronRightIcon className="w-6 h-6 text-gray-700" />
        </button>
    );
}
export default SampleNextArrow