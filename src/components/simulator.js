export const teams = {
    McLaren: { power: 10, reliability: 0.9 },
    Ferrari: { power: 9.2, reliability: 0.85 },
    Redbull: { power: 9.1, reliability: 0.95 },
    Mercedes: { power: 9.3, reliability: 0.96 },
    Williams: { power: 8.3, reliability: 0.90 },
    AstonMartin: { power: 7.5, reliability: 0.7 },
    Haas: { power: 6.25, reliability: 0.6 },
    RacingBulls: { power: 7.7, reliability: 0.82 },
    Alpine: { power: 6.5, reliability: 0.72 },
    Stake: { power: 6, reliability: 0.7 }
  };
  
  export const drivers = [
    { id: 1, name: "Lando Norris", team: "McLaren", skill: 8.8, aggression: 0.7 },
    { id: 2, name: "Oscar Piastri", team: "McLaren", skill: 8.8, aggression: 0.8 },
    { id: 3, name: "Max Verstappen", team: "Redbull", skill: 10, aggression: 1 },
    { id: 4, name: "Lewis Hamilton", team: "Ferrari", skill: 10, aggression: 0.8 },
    { id: 5, name: "Charles Leclerc", team: "Ferrari", skill: 9.3, aggression: 0.8 },
    { id: 6, name: "George Russell", team: "Mercedes", skill: 9, aggression: 0.8 },
    { id: 7, name: "Fernando Alonso", team: "AstonMartin", skill: 10, aggression: 0.9 },
    { id: 8, name: "Lance Stroll", team: "AstonMartin", skill: 7.2, aggression: 0.5 },
    { id: 9, name: "Pierre Gasly", team: "Alpine", skill: 8, aggression: 0.7 },
    { id: 10, name: "Esteban Ocon", team: "Haas", skill: 8, aggression: 0.8 },
    { id: 11, name: "Yuki Tsunoda", team: "RacingBulls", skill: 8.1, aggression: 0.9 },
    { id: 12, name: "Nico Hulkenberg", team: "Stake", skill: 8, aggression: 0.7 },
    { id: 13, name: "Alex Albon", team: "Williams", skill: 8.2, aggression: 0.7 },
    { id: 14, name: "Carlos Sainz", team: "Williams", skill: 8.1, aggression: 0.7 },
    { id: 15, name: "Andrea Kimi Antonelli", team: "Mercedes", skill: 7.5, aggression: 0.6 },
    { id: 16, name: "Liam Lawson", team: "Redbull", skill: 5.3, aggression: 0.6 },
    { id: 17, name: "Jack Doohan", team: "Alpine", skill: 5.1, aggression: 0.5 },
    { id: 18, name: "Oliver Bearman", team: "Haas", skill: 6.4, aggression: 0.6 },
    { id: 19, name: "Gabriel Bortoleto", team: "Stake", skill: 5, aggression: 0.5 },
    { id: 20, name: "Isack Hadjar", team: "RacingBulls", skill: 6.4, aggression: 0.6 }
  ];
  
  const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
  
  export const simulateRace = () => {
    // Weather: "dry" is default; "wet" and "tricky" conditions prioritize driver skill.
    const weatherCondition = Math.random() < 0.3 ? (Math.random() < 0.5 ? "wet" : "tricky") : "dry";
    const trackType = Math.random() < 0.5 ? "power" : "technical";
    const safetyCar = Math.random() < 0.2;
  
    const results = drivers.map(driver => {
      const { team, skill, aggression } = driver;
      const teamStats = teams[team];
      if (!teamStats) return { ...driver, performance: 0, dnf: true };
  
      const { power, reliability } = teamStats;
  
      // Base performance calculation
      let performance = skill * 0.6 + power * 0.3;
  
      // Under technical or adverse weather conditions, prioritize driver skill
      if (trackType === "technical" || weatherCondition !== "dry") {
        performance = skill * 0.7 + power * 0.2;
      } else if (trackType === "power") {
        performance *= 1.05;
      }
  
      // Tire wear factor (0.95 - 1.05)
      const tireWearFactor = 0.95 + Math.random() * 0.1;
      performance *= tireWearFactor;
  
      // Weather adjustment: in wet or tricky conditions, driver skill matters more
      let weatherFactor = 1;
      if (weatherCondition === "wet") {
        weatherFactor = 0.95 + skill * 0.01;
      } else if (weatherCondition === "tricky") {
        weatherFactor = 0.9 + skill * 0.008;
      }
      performance *= weatherFactor;
  
      // Reliability and aggression determine chance of DNF
      const dnf = Math.random() > reliability || (Math.random() < aggression * 0.1);
      if (dnf) {
        performance *= 0.5;
      }
  
      // Overtaking chance is influenced by aggression and track type
      let overtakingChance = 0.5 + aggression * 0.05;
      if (trackType === "technical") {
        overtakingChance *= 0.9;
      }
  
      return { ...driver, performance, dnf, overtakingChance };
    });
  
    let finishedDrivers = results.filter(driver => !driver.dnf);
    if (safetyCar) {
      finishedDrivers.forEach(driver => {
        driver.performance *= 0.95 + Math.random() * 0.1;
      });
    }
  
    finishedDrivers.sort((a, b) => b.performance - a.performance);
  
    // Apply team orders: if teammates are present, lower-skilled drivers yield slightly
    finishedDrivers.forEach((driver, index) => {
      if (index > 0 && driver.team === finishedDrivers[index - 1].team && driver.skill < finishedDrivers[index - 1].skill) {
        driver.performance *= 0.98;
      }
    });
  
    finishedDrivers.sort((a, b) => b.performance - a.performance);
  
    return finishedDrivers.map((driver, index) => ({
      ...driver,
      position: index + 1,
      points: index < 10 ? pointsSystem[index] : 0
    }));
  };
  