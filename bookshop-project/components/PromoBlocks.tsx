export default function PromoBlocks() {
  return (
    <div className="absolute right-0 top-0 h-full flex flex-col justify-center gap-8">
      {/* Верхний промо-блок */}
      <div className="w-[149px] h-[204px] bg-[#9e98dc] p-6 flex flex-col justify-between">
        <h3 className="text-[18px] font-bold uppercase text-[#1c2a39] leading-tight">
          Change
          <br />
          old book
          <br />
          on new
        </h3>
        <div className="flex justify-end">
          <svg width="55" height="12" viewBox="0 0 55 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M54.5303 6.53033C54.8232 6.23744 54.8232 5.76256 54.5303 5.46967L49.7574 0.696699C49.4645 0.403806 48.9896 0.403806 48.6967 0.696699C48.4038 0.989593 48.4038 1.46447 48.6967 1.75736L52.9393 6L48.6967 10.2426C48.4038 10.5355 48.4038 11.0104 48.6967 11.3033C48.9896 11.5962 49.4645 11.5962 49.7574 11.3033L54.5303 6.53033ZM0 6.75H54V5.25H0V6.75Z"
              fill="#1C2A39"
            />
          </svg>
        </div>
      </div>

      {/* Нижний промо-блок */}
      <div className="w-[137px] h-[273px] bg-[#ff8fe6] p-6 flex flex-col justify-between">
        <h3 className="text-[18px] font-bold uppercase text-[#1c2a39] leading-tight">
          Top
          <br />
          100
          <br />
          books
          <br />
          2023
        </h3>
        <div className="flex justify-end">
          <svg width="55" height="12" viewBox="0 0 55 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M54.5303 6.53033C54.8232 6.23744 54.8232 5.76256 54.5303 5.46967L49.7574 0.696699C49.4645 0.403806 48.9896 0.403806 48.6967 0.696699C48.4038 0.989593 48.4038 1.46447 48.6967 1.75736L52.9393 6L48.6967 10.2426C48.4038 10.5355 48.4038 11.0104 48.6967 11.3033C48.9896 11.5962 49.4645 11.5962 49.7574 11.3033L54.5303 6.53033ZM0 6.75H54V5.25H0V6.75Z"
              fill="#1C2A39"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
