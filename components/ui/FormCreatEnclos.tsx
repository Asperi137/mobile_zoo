export default function FormCreatEnclos() {
  const handleSubmit = async(event : Event)=>{
    event.preventDefault()
    

    
  }

	return <form action='creatEnclos' method="post" id="create_enclos">
    <label>nom</label><input type="text" id="nom" name="nom"></input>
    <label>zone</label><input type="text" id="zone" name= "zone"></input>
    <label>coordonnées</label><input type="text" id ="coordonnees" name ="coordonees"></input>
    <label>superficie</label><input type="number" id="superficie" name="superficie"></input>
    <button type="submit">valider</button>
  </form>;
}

