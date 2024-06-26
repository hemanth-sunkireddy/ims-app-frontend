import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { color, ScreenWidth } from "@rneui/base";

export let selected_year = "";
export let selected_sem = "";

function GeneralDetails(defaultValues: JSON): React.JSX.Element {
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  const currentYearOption = `${currentYear}-${(currentYear + 1) % 100}`;

  if (currentMonth <= 7) currentYear = currentYear - 1;

  const ListofYears = [];
  for (let i = currentYear; i > currentYear - 5; i--) {
    ListofYears.push({
      key: `${i}-${(i + 1) % 100}`,
      value: `${i}-${(i + 1) % 100}`,
    });
  }
  ListofYears.unshift({ key: "Select...", value: "Select..." });

  const ListofSemestersFull = [
    { key: "Monsoon", value: "Monsoon" },
    { key: "Spring", value: "Spring" },
  ];
  const ListofSemestersHalf = [{ key: "Monsoon", value: "Monsoon" }];

  let defaultYear: string = String(defaultValues["defaultYear"]);
  let defaultSem: string = String(defaultValues["defaultSem"]);

  if (!ListofYears.some((value) => value.key === defaultYear)) {
    defaultYear = "Select...";
  }
  if (currentMonth > 7 && defaultYear == currentYearOption) {
    if (!ListofSemestersHalf.some((value) => value.key === defaultSem)) {
      defaultSem = "Select...";
    }
  } else {
    if (!ListofSemestersFull.some((value) => value.key === defaultSem)) {
      defaultSem = "Select...";
    }
  }

  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [selectedSem, setSemester] = useState(defaultSem);

  // Update the exported variables whenever acadyear or semester changes
  useEffect(() => {
    selected_sem = selectedSem;
    selected_year = selectedYear;
  }, [selectedYear, selectedSem]);

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        <Text
          style={{
            marginVertical: 10,
            fontSize: 18,
            color: "black",
            marginLeft: ScreenWidth * 0.03,
          }}
        >
          AcadYear :
        </Text>
        <View style={{ marginHorizontal: 20, width: 150 }}>
          <SelectList
            setSelected={(value: string) => {
              setSelectedYear(value);
            }}
            data={ListofYears}
            placeholder="Select..."
            dropdownTextStyles={{ color: "black" }}
            inputStyles={{ color: "black" }}
            search={false}
            defaultOption={{ key: defaultYear, value: defaultYear }}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          marginLeft: ScreenWidth * 0.03,
        }}
      >
        <Text style={{ marginVertical: 10, fontSize: 18, color: "black" }}>
          Semester :
        </Text>
        <View style={{ marginHorizontal: 20, width: 150 }}>
          {currentMonth > 7 && selectedYear == currentYearOption ? (
            <SelectList
              setSelected={(value: string) => {
                setSemester(value);
              }}
              data={ListofSemestersHalf}
              placeholder="Select..."
              dropdownTextStyles={{ color: "black" }}
              inputStyles={{ color: "black" }}
              search={false}
              defaultOption={{ key: defaultSem, value: defaultSem }}
            />
          ) : (
            <SelectList
              setSelected={(value: string) => {
                setSemester(value);
              }}
              data={ListofSemestersFull}
              placeholder="Select..."
              dropdownTextStyles={{ color: "black" }}
              inputStyles={{ color: "black" }}
              search={false}
              defaultOption={{ key: defaultSem, value: defaultSem }}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default GeneralDetails;
