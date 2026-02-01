export const getRegionData = (images) => {
  const getImage = (filename) => {
    const image = images.find((img) =>
      img.name.toLowerCase().includes(filename.toLowerCase()),
    );

    return image?.url || "";
  };

  return [
    {
      id: "cat0",
      name: "All",
      region: "",
      images: [
        {
          id: "img1",
          src: getImage("rendang"),
          alt: "Rendang",
          name: "Rendang",
        },
        { id: "img2", src: getImage("pasta"), alt: "Pasta", name: "Pasta" },
        {
          id: "img3",
          src: getImage("barbeque"),
          alt: "Barbeque",
          name: "Barbeque",
        },
      ],
    },
    {
      id: "cat1",
      name: "Asian",
      region: "asia",
      images: [
        {
          id: "img1",
          src: getImage("rendang"),
          alt: "Rendang",
          name: "Rendang",
        },
      ],
      alt: "Asian Food",
    },
    {
      id: "cat2",
      name: "European",
      region: "europe",
      images: [
        { id: "img1", src: getImage("pasta"), alt: "Pasta", name: "pasta" },
      ],
      alt: "European Food",
    },
    {
      id: "cat3",
      name: "American",
      region: "america",
      images: [
        {
          id: "img1",
          src: getImage("barbeque"),
          alt: "Barbeque",
          name: "Barbeque",
        },
      ],
      alt: "American Food",
    },
  ];
};
