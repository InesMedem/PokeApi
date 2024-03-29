const Cards = ({ data }) => {
  console.log("🚀 ~ Cards ~ data:", data);
  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <h1>name {data.name}</h1>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`}
          />
          <div className="abilities">
            <div className="group">
              <h2>blaze</h2>
            </div>
          </div>
          <div className="base-state">
            <h3>Hp: 30</h3>
            <h3>attack: 52</h3>
            <h3>defense: 43</h3>
            <h3>special-attack: 43</h3>
            <h3>speed: 43</h3>
          </div>
        </>
      )}
    </>
  );
};

export default Cards;
