import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
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

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || '';

export default function ConversationScreen() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: '你好！(Nǐ hǎo!)', pinyin: 'Nǐ hǎo!', indonesian: 'Halo! Saya asisten AI Wisesa. Mari berlatih bahasa Mandarin!', isUser: false }
  ]);

  const speak = (text: string) => {
    Speech.speak(text, { language: 'zh-CN', rate: 0.8 });
  };

  const parseAIResponse = (response: string): { hanzi: string, pinyin: string, indonesian: string } => {
    const lines = response.split('\n').map(l => l.trim()).filter(l => l);
    let hanzi = '';
    let pinyin = '';
    let indonesian = '';
    
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      if (lowerLine.startsWith('hanzi:')) hanzi = line.substring(6).trim();
      else if (lowerLine.startsWith('pinyin:')) pinyin = line.substring(7).trim();
      else if (lowerLine.startsWith('arti:')) indonesian = line.substring(5).trim();
    });
    
    if (!hanzi && lines.length > 0) hanzi = lines[0];
    
    return { hanzi: hanzi || response, pinyin, indonesian };
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    
    try {
      const apiMessages = messages.map(m => ({
        role: m.isUser ? 'user' : 'assistant',
        content: m.isUser ? m.text : m.text
      }));
      
      apiMessages.push({ role: 'user', content: userMsg.text });
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          response_format: { type: "json_object" },
          messages: [
            { 
              role: 'system', 
              content: "Kamu adalah teman chat belajar bahasa Mandarin yang sangat ramah. Semua balasanmu WAJIB menggunakan format JSON murni. Kamu tidak boleh membalas selain objek JSON ini: {\"hanzi\": \"Karakter Mandarin saja\", \"pinyin\": \"Pinyin dari karakter tersebut\", \"indonesian\": \"Arti dalam bahasa Indonesia\"}"
            },
            ...apiMessages
          ],
          temperature: 0.7,
          max_tokens: 150
        })
      });
      
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const aiText = data.choices[0].message.content;
        let parsed = { hanzi: '', pinyin: '', indonesian: '' };
        
        try {
          const parsedJSON = JSON.parse(aiText);
          parsed.hanzi = parsedJSON.hanzi || aiText;
          parsed.pinyin = parsedJSON.pinyin || '';
          parsed.indonesian = parsedJSON.indonesian || '';
        } catch (e) {
          parsed.hanzi = aiText; // Fallback if still not valid JSON
        }
        
        const botMsg: Message = {
          id: Date.now().toString(),
          text: parsed.hanzi,
          pinyin: parsed.pinyin,
          indonesian: parsed.indonesian,
          isUser: false
        };
        
        setMessages(prev => [...prev, botMsg]);
        speak(parsed.hanzi);
      }
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now().toString(),
        text: 'Maaf, saya gagal terhubung ke server AI.',
        indonesian: 'Periksa koneksi internet Anda.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Percakapan AI</Text>
        <Text style={styles.headerSubtitle}>Didukung oleh Groq Llama3</Text>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatArea} 
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
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
        {isLoading && (
          <View style={[styles.messageBubble, styles.botBubble, { alignSelf: 'flex-start', padding: 12 }]}>
            <ActivityIndicator color={COLORS.primary} />
          </View>
        )}
      </ScrollView>
      
      <View style={styles.inputArea}>
        <TextInput 
          style={styles.input}
          placeholder="Ketik bahasa Indonesia/Mandarin..."
          placeholderTextColor={COLORS.textLight}
          value={inputText}
          onChangeText={setInputText}
          editable={!isLoading}
        />
        <TouchableOpacity 
          style={[styles.sendBtn, isLoading && { backgroundColor: COLORS.border }]} 
          onPress={handleSend}
          disabled={isLoading}
        >
          <Ionicons name="send" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { padding: 24, paddingBottom: 12, backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: COLORS.text },
  headerSubtitle: { fontSize: 13, color: COLORS.primary, marginTop: 4 },
  chatArea: { flex: 1 },
  messageBubble: { maxWidth: '85%', padding: 16, borderRadius: 20, marginBottom: 16 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: COLORS.primary, borderBottomRightRadius: 4 },
  botBubble: { alignSelf: 'flex-start', backgroundColor: COLORS.surface, borderBottomLeftRadius: 4, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  messageText: { fontSize: 18, color: COLORS.text, marginBottom: 4, fontWeight: '500' },
  userMessageText: { color: COLORS.white, marginBottom: 0, fontSize: 16, fontWeight: 'normal' },
  pinyinText: { fontSize: 15, color: COLORS.primary, fontWeight: 'bold', marginBottom: 4 },
  indonesianText: { fontSize: 14, color: COLORS.textLight, fontStyle: 'italic' },
  playBtn: { marginTop: 12, alignSelf: 'flex-end', width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.primaryLight + '30', alignItems: 'center', justifyContent: 'center' },
  inputArea: { padding: 16, paddingBottom: Platform.OS === 'ios' ? 32 : 16, backgroundColor: COLORS.surface, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderColor: COLORS.border },
  input: { flex: 1, height: 50, backgroundColor: COLORS.background, borderRadius: 25, paddingHorizontal: 20, fontSize: 16, color: COLORS.text, marginRight: 12 },
  sendBtn: { width: 50, height: 50, borderRadius: 25, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
});
