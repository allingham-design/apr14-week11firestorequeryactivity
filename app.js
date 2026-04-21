// task 1: creating 7 objects, one for each team
let team1 = {
  name: "Real Madrid",
  city: "Madrid",
  country: "Spain",
  top_scorers: ["Ronaldo", "Benzema", "Hazard"],
  fans: 798,
};

let team2 = {
  name: "Barcelona",
  city: "Barcelona",
  country: "Spain",
  top_scorers: ["Messi", "Suarez", "Puyol"],
  fans: 738,
};

let team3 = {
  name: "Manchester United",
  city: "Manchester",
  country: "England",
  top_scorers: ["Cantona", "Rooney", "Ronaldo"],
  fans: 755,
};

let team4 = {
  name: "Manchester City",
  city: "Manchester",
  country: "England",
  top_scorers: ["Sterling", "Aguero", "Haaland"],
  fans: 537,
};

let team5 = {
  name: "Brazil National Team",
  city: "Not applicable",
  country: "Brazil",
  top_scorers: ["Ronaldinho", "Cafu", "Bebeto"],
  fans: 950,
};

let team6 = {
  name: "Argentina national team",
  city: "Not applicable",
  country: "Argentina",
  top_scorers: ["Messi", "Batistuta", "Maradona"],
  fans: 888,
};

let team7 = {
  name: "Atletico Madrid",
  city: "Madrid",
  country: "Spain",
  top_scorers: ["Aragonés", "Griezmann", "Torez"],
  fans: 400,
};

// task 1: adding those objects to the teams collection
// db.collection("teams").doc("team1").set(team1);
// db.collection("teams").doc("team2").set(team2);
// db.collection("teams").doc("team3").set(team3);
// db.collection("teams").doc("team4").set(team4);
// db.collection("teams").doc("team5").set(team5);
// db.collection("teams").doc("team6").set(team6);
// db.collection("teams").doc("team7").set(team7);

// task 2: querying data
// define function
function show_teams(title, data) {
  let html = `<br><br><h1><strong>${title}</strong></h1>`;

  data.forEach((doc) => {
    let t = doc.data();
    html += `<p class="p-1">${t.name}</p>`;
  });
  document.querySelector("#queryoutput").innerHTML += html;
}

// query 1: show all teams in Spain
db.collection("teams")
  .where("country", "==", "Spain")
  .get()
  .then((data) => show_teams("Query 1: All teams in Spain", data));

// query 2: show all teams in Madrid, Spain
db.collection("teams")
  .where("city", "==", "Madrid")
  .get()
  .then((data) => show_teams("Query 2: All teams in Madrid, Spain", data));

// query 3: show all national teams
db.collection("teams")
  .where("city", "==", "Not applicable")
  .get()
  .then((data) => show_teams("Query 3: All national teams", data));

// query 4: show all teams that are not in Spain
db.collection("teams")
  .where("country", "!=", "Spain")
  .get()
  .then((data) => show_teams("Query 4: All teams that are not in Spain", data));

// query 5: show all teams that are not in Spain or England
db.collection("teams")
  .where("country", "not-in", ["Spain", "England"])
  .get()
  .then((data) =>
    show_teams("Query 5: All teams that are not in Spain or England", data),
  );

// query 6: show all teams in Spain with more than 700M fans
db.collection("teams")
  .where("fans", ">", 700)
  .get()
  .then((data) => {
    let mydocs = data.docs;

    // filter query in JS to include only the Spain countries
    let filtered = mydocs.filter((d) => d.data().country === "Spain");

    show_teams("Query 6: All teams in Spain with more than 700M fans", {
      forEach: filtered.forEach.bind(filtered),
      size: filtered.length,
    });
  });

// query 7: show all teams with a number of fans in the range of 500M and 600M
db.collection("teams")
  .where("fans", ">=", 500)
  .where("fans", "<=", 600)
  .get()
  .then((data) =>
    show_teams(
      "Query 7: All teams with a number of fans in the range of 500M and 600M",
      data,
    ),
  );

// query 8: show all teams where Ronaldo is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains", "Ronaldo")
  .get()
  .then((data) =>
    show_teams("Query 8: All teams where Ronaldo is a top scorer", data),
  );

// query 9: show all teams where Ronaldo, Maradona, or Messi is a top scorer
db.collection("teams")
  .where("top_scorers", "array-contains-any", ["Ronaldo", "Maradona", "Messi"])
  .get()
  .then((data) =>
    show_teams(
      "Query 9: All teams where Ronaldo, Maradona, or Messi is a top scorer",
      data,
    ),
  );

// task 3: updating data
// update Real Madrid to 811 M worldwide fans. also, change team name to Real Madrid FC
db.collection("teams").doc("team1").update({
  name: "Real Madrid FC",
  fans: 811,
});

// update Barcelona to 747 M worldwide fans. also, change team name to FC Barcelona
db.collection("teams").doc("team2").update({
  name: "FC Barcelona",
  fans: 747,
});

// update the top scorers for Real Madrid: remove Hazard from the list and add Crispo to the list
db.collection("teams")
  .doc("team1")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Hazard"),
    top_scorers: firebase.firestore.FieldValue.arrayUnion("Crispo"),
  });

// update the top scorers for Barcelona: remove Puyol from the list and add Deco to the list
db.collection("teams")
  .doc("team2")
  .update({
    top_scorers: firebase.firestore.FieldValue.arrayRemove("Puyol"),
    top_scorers: firebase.firestore.FieldValue.arrayUnion("Deco"),
  });

// task 3: adding new fields to existing documents
// add the jersey colors for just a couple of our teams
let realmadridcolors = {
  color: {
    home: "White",
    away: "Black",
  },
};

let barcelonacolors = {
  color: {
    home: "Red",
    away: "Gold",
  },
};

db.collection("teams").doc("team1").update(realmadridcolors);
db.collection("teams").doc("team2").update(barcelonacolors);

// task 3: update the jersey colors (object) for away matches
// Real Madrid is now Purple jersey color for away matches
db.collection("teams").doc("team1").update({
  "color.away": "Purple",
});
// Barcelona is now Pink jersey color for away matches
db.collection("teams").doc("team2").update({
  "color.away": "Pink",
});
