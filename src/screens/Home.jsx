import React, { useEffect, useState, useCallback } from "react";
import { Button, Header } from "@rneui/base";
import { StyleSheet, Text } from "react-native";
import { View, Share } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const choiceArray = ["rock", "paper", "scissors"];
const priorityMap = {
  scissors: "paper",
  rock: "scissors",
  paper: "rock",
};

const Home = () => {
  const { bottom } = useSafeAreaInsets();
  const [userChoice, setUserChoice] = useState(null);
  const [compChoice, setCompChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);

  const onSelect = (choice) => {
    setUserChoice(choice);
    setCompChoice(getComputerChoice());
  };

  const getComputerChoice = () => {
    const random = Math.floor(Math.random() * 3);
    return choiceArray[random];
  };

  const getWinner = useCallback(() => {
    if (userChoice === null) return null;
    if (userChoice === compChoice) return "draw";
    if (priorityMap[userChoice] === compChoice) {
      return "user";
    }
    return "computer";
  }, [userChoice, compChoice]);

  useEffect(() => {
    const whoWon = getWinner();
    if (!whoWon) return;
    setWinner(whoWon);
    if (whoWon === "user") {
      setUserScore((prevValue) => prevValue + 1);
    }
    if (whoWon === "computer") {
      setCompScore((prevValue) => prevValue + 1);
    }
  }, [userChoice, compChoice, getWinner]);

  const handleResultShare = async () => {
    await Share.share({
      title: "Checkout my result in rock, paper, scissors",
      message: `My score is User: ${userScore} and Computer: ${compScore}`,
      url: "http://gameurl.com/",
    });
  };

  return (
    <>
      <Header
        centerComponent={{ text: "Rock Paper Scissors", style: styles.heading }}
      />
      <View style={{ flex: 1, paddingBottom: bottom }}>
        <Button
          title="Share"
          icon={<EvilIcons name="share-apple" size={28} color="white" />}
          iconRight
          buttonStyle={[styles.button, styles.shareBtn]}
          onPress={handleResultShare}
        />
        <View style={styles.scoreSheet}>
          <Text style={styles.scoreHeading}>Score</Text>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreBoard}>
              <Text style={styles.scoreName}>User</Text>
              <Text style={styles.scoreValue}>{userScore}</Text>
            </View>
            <View style={styles.scoreBoard}>
              <Text style={styles.scoreName}>Computer</Text>
              <Text style={styles.scoreValue}>{compScore}</Text>
            </View>
          </View>
          <Text style={styles.winnerText}>You selected {userChoice} while computer selected {compChoice}</Text>
          {winner && 
            (winner === "draw" ? (
              <Text style={styles.winnerText}>Match was a draw</Text>
            ) : (
              <Text style={styles.winnerText}>{winner} is winner</Text>
            ))}
        </View>
        <View style={styles.btnWrapper}>
          <Button
            title="Rock 🪨"
            size="sm"
            buttonStyle={styles.button}
            containerStyle={styles.btnContainer}
            onPress={() => onSelect("rock")}
          />
          <Button
            title="Paper 📄"
            size="sm"
            buttonStyle={[styles.button, { backgroundColor: "tomato" }]}
            containerStyle={styles.btnContainer}
            onPress={() => onSelect("paper")}
          />
          <Button
            title="Scissor ✂️"
            size="sm"
            buttonStyle={[styles.button, { backgroundColor: "green" }]}
            containerStyle={styles.btnContainer}
            onPress={() => onSelect("scissors")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  scoreSheet: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  scoreHeading: {
    fontSize: 32,
    fontWeight: '800',
    alignSelf: 'center'
  },
  scoreContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
  },
  scoreBoard: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 26,
  },
  scoreName: {
    fontSize: 18,
    fontWeight: '700'
  },
  scoreValue: {
    fontSize: 32,
  },
  winnerText: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    textAlign: 'center'
  },
  button: {
    backgroundColor: "rgba(78, 116, 289, 1)",
    borderRadius: 3,
    width: 100,
    paddingVertical: 10,
  },
  shareBtn: { backgroundColor: "teal", alignSelf: 'flex-end', margin: 5 },
  btnWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
});

export default Home;
