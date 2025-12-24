const ImgCategory = ({ img, className }) => {
  return (
    <li className={className}>
      <img
        className="w-full h-full object-cover object-center"
        src={img.src}
        alt={img.alt}
        loading="lazy"
      />
    </li>
  );
};

export default ImgCategory;
