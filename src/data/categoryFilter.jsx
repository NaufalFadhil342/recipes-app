export const getCategoryData = (images) => {
  const getImage = (filename) => {
    const image = images.find((img) =>
      img.name.toLowerCase().includes(filename.toLowerCase())
    );

    return image?.url || "";
  };

  return [
    {
      id: "cat0",
      name: "All",
      category: "",
      images: [
        {
          id: "img1",
          src: getImage("rendang"),
          alt: "Rendang",
          name: "Rendang",
        },
        { id: "img2", src: getImage("rawon"), alt: "Rawon", name: "Rawon" },
        {
          id: "img3",
          src: getImage("nasi-liwet"),
          alt: "Nasi Liwet",
          name: "Nasi Liwet",
        },
      ],
    },
    {
      id: "cat1",
      name: "Asean",
      category: "asean",
      images: [
        { id: "img1", src: getImage("tomyam"), alt: "Tomyam", name: "Tomyam" },
      ],
      alt: "Asean Food",
    },
    {
      id: "cat2",
      name: "Asian",
      category: "asian",
      images: [
        { id: "img1", src: getImage("ramen"), alt: "Ramen", name: "ramen" },
      ],
      alt: "Asian Food",
    },
    {
      id: "cat3",
      name: "European",
      category: "european",
      images: [
        { id: "img1", src: getImage("pasta"), alt: "Pasta", name: "pasta" },
      ],
      alt: "European Food",
    },
    {
      id: "cat4",
      name: "American",
      category: "american",
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
    {
      id: "cat5",
      name: "Middle East",
      category: "eastern",
      images: [
        {
          id: "img1",
          src: getImage("shawarma"),
          alt: "Shawarma",
          name: "Shawarma",
        },
      ],
      alt: "Middle East Food",
    },
  ];
};
