const Testimony = ({ testi }) => {
  return (
    <div className="flex-[0_0_100%] h-auto bg-white p-6 rounded-3xl text-center shadow-[2px_2px_5px_rgba(41,37,36,0.08)]">
      <p className="text-stone-600">{testi.comment}</p>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-inherit">{testi.name}</h3>
        <p className="test-stone-600 text-sm italic">Professional Chef</p>
      </div>
    </div>
  );
};

export default Testimony;
