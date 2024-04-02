import { TailSpin } from 'react-loading-icons';

const LoadMoreButton = ({ ...props }) => {
  const { isLoading, onClick } = props;
  return (
    <>
      <div className='mx-auto flex justify-center pt-4 '>
        <div
          onClick={isLoading ? null : onClick}
          className='active:!border-b-3  group flex cursor-pointer items-center rounded-xl border-2 border-b-4 border-blue-950 bg-[#38AC8F] font-medium text-[#fff] drop-shadow-lg duration-150 hover:opacity-70 active:opacity-70'
        >
          <div className='px-3 py-2 capitalize'>
            {isLoading ? 'Loading...' : 'Tải thêm'}{' '}
          </div>
          <div
            className={
              isLoading
                ? 'w-auto scale-100 py-2 pr-3 opacity-100 duration-200'
                : 'w-0 scale-0 p-0 opacity-0 duration-100'
            }
          >
            <TailSpin
              stroke='#98ff98'
              style={{
                maxWidth: '2rem',
                width: '100%',
                height: '100%',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LoadMoreButton;
