import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { supabase } from "../../services/supabase";
import { useRoute } from "@react-navigation/native";

export function Details() {
  const route = useRoute();
  const { groupId } = route.params;
  const [group, setGroup] = useState<any>(null);
  const [participants, setParticipants] = useState<any[]>([]);

  useEffect(() => {
    // Função para buscar os detalhes do grupo
    const fetchGroupDetails = async () => {
      const { data: groupData, error: groupError } = await supabase
        .from("groups")
        .select("id, name, score")
        .eq("id", groupId)
        .single();

      if (groupError) {
        console.log("Erro ao buscar grupo:", groupError);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do grupo.");
      } else {
        setGroup(groupData);
      }

      // Buscar os participantes do grupo
      const { data: participantsData, error: participantsError } = await supabase
        .from("participants")
        .select("name")
        .eq("group_id", groupId);

      if (participantsError) {
        console.log("Erro ao buscar participantes:", participantsError);
      } else {
        setParticipants(participantsData);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (!group) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{group.name}</Text>
      <Text style={styles.score}>Nota: {group.score}</Text>

      <Text style={styles.subtitle}>Participantes:</Text>
      {participants.length > 0 ? (
        participants.map((participant, index) => (
          <Text key={index} style={styles.participant}>
            {participant.name}
          </Text>
        ))
      ) : (
        <Text style={styles.noParticipants}>Nenhum participante encontrado.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: 10,
  },
  score: {
    fontSize: 18,
    color: "#888",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ea",
    marginBottom: 10,
  },
  participant: {
    fontSize: 16,
    color: "#333",
  },
  noParticipants: {
    fontSize: 16,
    color: "#888",
  },
});
