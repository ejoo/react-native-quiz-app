import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button";

export default class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answer: null
    };
  }

  renderOptions = question => {
    if (question.type === "boolean") {
      return [
        <RadioButton value={"True"} key={1}>
          <Text style={styles.radioText}>True</Text>
        </RadioButton>,

        <RadioButton value={"False"} key={2}>
          <Text style={styles.radioText}>False</Text>
        </RadioButton>
      ];
    } else {
      const result = [];

      question.incorrect_answers.forEach((item, index) => {
        let key = `${question.id}-${index}`;

        if (index === this.props.correctPosition) {
          let key2 = `${question.id}-100`;
          result.push(
            <RadioButton value={question.correct_answer} key={key2}>
              <Text style={styles.radioText}>{question.correct_answer}</Text>
            </RadioButton>
          );
        }

        result.push(
          <RadioButton value={item} key={key}>
            <Text style={styles.radioText}>{item}</Text>
          </RadioButton>
        );
      });

      return result;
    }
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 12 }}>
        <Text style={{ fontSize: 16, color: "#666", textAlign: "right" }}>
          {this.props.current + 1} out of 10
        </Text>

        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#3498db" }}>
          {this.props.question.question}
        </Text>
        <RadioGroup
          onSelect={(index, answer) => this.setState({ answer })}
          selectedIndex={null}
        >
          {this.renderOptions(this.props.question)}
        </RadioGroup>

        <Button
          title="Submit Answser"
          onPress={() => {
            this.props.onSelect(this.state.answer);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  radioText: {
    fontSize: 20
  }
});
