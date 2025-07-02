import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Container, Header, Title } from "../Register/styles";
import { MonthNavigation, MonthText, IconButton, LegendItem, ColorBox, Text, SpaceText, Graphic, Buttons } from "./styles";
import { Feather } from '@expo/vector-icons';
import { FlatList } from "react-native";
import { VictoryPie } from "victory-native";
import { getResume } from "../../api/api";


// serve para remover um warning no celular da versao do victory-native
import { LogBox } from 'react-native';
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
LogBox.ignoreLogs([
  'Support for defaultProps will be removed from function components'
]);

export function Resume() {
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [chartData, setChartData] = useState<{ x: string; y: number }[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const entries = await getResume(currentYear, currentMonthIndex + 1);
      const formatted = entries.map(e => ({
        x: e.categoria,
        y: Number(e.total)
      }));
      setChartData(formatted);
    } catch (err) {
      console.error("Erro ao buscar dados de resumo:", err);
    }
  }, [currentYear, currentMonthIndex]);

  // callback sincrono que apenas dispara o async
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const total = chartData.reduce((sum, item) => sum + item.y, 0);

  // Ordena por valor decrescente
  const sortedData = [...chartData].sort((a, b) => b.y - a.y);

  // Divide em top 9 e o resto
  const topCategories = sortedData.slice(0, 7);
  const otherCategories = sortedData.slice(7);

  // Soma o total de "Outros"
  const otherTotal = otherCategories.reduce((sum, item) => sum + item.y, 0);

  // Dados que vão pro gráfico
  const chartDataLimited = otherTotal > 0
    ? [...topCategories, { x: "Outros", y: otherTotal }]
    : [...topCategories];

  // Define uma cor fixa para "Outros"
  const OTHER_COLOR = "#999999";

  // Cores para o gráfico (última cor = "Outros")
  const colors = chartDataLimited.map((item, index) =>
    item.x === "Outros"
      ? OTHER_COLOR
      : `hsl(${(index * 360) / chartDataLimited.length}, 70%, 50%)`
  );

  const isCurrentMonth =
    currentMonthIndex === today.getMonth() &&
    currentYear === today.getFullYear();

  function handlePrevMonth() {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonthIndex(i => i - 1);
    }
  }

  function handleNextMonth() {
    if (isCurrentMonth) return;
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonthIndex(i => i + 1);
    }
  }




  return (
    <Container>
      <Header>
        <Title>Resumo</Title>
      </Header>
      
        <MonthNavigation>
          <IconButton onPress={handlePrevMonth}>
            <Feather name="chevron-left" size={26} />
          </IconButton>

          <MonthText>
            {`${["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"][currentMonthIndex]}, ${currentYear}`}
          </MonthText>

          <IconButton onPress={handleNextMonth} disabled={isCurrentMonth}>
            <Feather
              name="chevron-right"
              size={26}
              color={isCurrentMonth ? "#ccc" : "#000"}
            />
          </IconButton>
        </MonthNavigation>
      

      <Graphic>
        <VictoryPie
          data={chartDataLimited}
          colorScale={colors}
          labelRadius={100}
          width={350}
          height={350}

          style={{
            labels: { fill: "#fff", fontSize: 12, fontWeight: "bold" },
            data: {
              stroke: "#000",       // cor da borda
              strokeWidth: 1    // espessura da borda
            }
          }}
          labels={({ datum }) =>
            total > 0 ? `${Math.round((datum.y / total) * 100)}%` : ""
          }
        />
      </Graphic>

  {/*     <Buttons>
        <TransactionTypeButton
          title="Income"
          type="up"

        />
        <TransactionTypeButton
          title="Outcome"
          type="down"

        />
      </Buttons> */}


      <FlatList
        data={chartData}
        keyExtractor={item => item.x}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        renderItem={({ item }) => {
          // Verifica se item está nos top 9
          const isInTop = topCategories.find(top => top.x === item.x);
          const colorIndex = topCategories.findIndex(top => top.x === item.x);
          const color = isInTop
            ? colors[colorIndex]
            : OTHER_COLOR;

          return (
            <LegendItem>
              <ColorBox bgColor={color} />
              <SpaceText>
                <Text>{item.x}</Text>
                <Text>R${item.y.toFixed(2)}</Text>
              </SpaceText>
            </LegendItem>
          );
        }}
      />
    </Container>
  );
}

