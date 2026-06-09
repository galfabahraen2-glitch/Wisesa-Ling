import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  pinyin?: string;
  indonesian?: string;
}

export default function ConversationScreen() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！(Nǐ hǎo!)', pinyin: 'Nǐ hǎo!', indonesian: 'Halo!', isUser: false }
  ]);

  const speak = (text: string) => {
    Speech.speak(text, { language: 'zh-CN', rate: 0.8 });
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    
    // Simulate AI response based on MVP static scenarios
    setTimeout(() => {
      let botMsg: Message;
      const lowerInput = userMsg.text.toLowerCase();
      
      if (lowerInput.includes('halo') || lowerInput.includes('hai')) {
        botMsg = { id: Date.now().toString(), text: '你好！你今天好吗？', pinyin: 'Nǐ hǎo! Nǐ jīn tiān hǎo ma?', indonesian: 'Halo! Bagaimana kabarmu hari ini?', isUser: false };
      } else if (lowerInput.includes('kabar') || lowerInput.includes('baik')) {
        botMsg = { id: Date.now().toString(), text: '我很好，谢谢！', pinyin: 'Wǒ hěn hǎo, xiè xiè!', indonesian: 'Saya sangat baik, terima kasih!', isUser: false };
      } else {
        botMsg = { id: Date.now().toString(), text: '对不起，我还在学习。', pinyin: 'Duì bù qǐ, wǒ hái zài xué xí.', indonesian: 'Maaf, saya masih belajar.', isUser: false };
      }
      
      setMessages(prev => [...prev, botMsg]);
      speak(botMsg.text);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Latihan Percakapan</Text>
        <Text style={styles.headerSubtitle}>Ketik dalam bahasa Indonesia</Text>
      </View>
      
      <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 24 }}>
        {messages.map(msg => (
          <View key={msg.id} style={[styles.messageBubble, msg.isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={[styles.messageText, msg.isUser && styles.userMessageText]}>{msg.text}</Text>
            {!msg.isUser && msg.pinyin && <Text style={styles.pinyinText}>{msg.pinyin}</Text>}
            {!msg.isUser && msg.indonesian && <Text style={styles.indonesianText}>{msg.indonesian}</Text>}
            
            {!msg.isUser && (
              <TouchableOpacity style={styles.playBtn} onPress={() => speak(msg.text)}>
                <Ionicons name="volume-medium" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input}
          placeholder="Ketik 'halo'..."
          placeholderTextColor={COLORS.textLight}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Ionicons name="send" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 24,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  chatArea: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 16,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 4,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  userMessageText: {
    color: COLORS.white,
    marginBottom: 0,
  },
  pinyinText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  indonesianText: {
    fontSize: 13,
    color: COLORS.textLight,
    fontStyle: 'italic',
  },
  playBtn: {
    marginTop: 8,
    alignSelf: 'flex-end',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight + '30',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: COLORS.surface,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.background,
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.text,
    marginRight: 12,
  },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
