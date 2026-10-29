import { supabase } from './supabase'

// Flashcards
export async function getFlashcards(userId) {
  const { data, error } = await supabase
    .from('flashcards')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}

export async function upsertFlashcard(userId, card) {
  const { data, error } = await supabase
    .from('flashcards')
    .upsert({
      user_id: userId,
      card_id: card.card_id,
      front: card.front,
      back: card.back,
      srs_data: card.srs_data || {},
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFlashcard(cardId) {
  const { error } = await supabase
    .from('flashcards')
    .delete()
    .eq('id', cardId)
  if (error) throw error
}

// Notes
export async function getNotes(userId) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', userId)
  if (error) throw error
  return data
}

export async function upsertNote(userId, note) {
  const { data, error } = await supabase
    .from('notes')
    .upsert({
      user_id: userId,
      card_id: note.card_id,
      content: note.content,
      image_url: note.image_url || null,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteNote(noteId) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)
  if (error) throw error
}

// Progress/Stats
export async function getProgress(userId) {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error && error.code !== 'PGRST116') throw error
  return data
}

export async function upsertProgress(userId, stats) {
  const { data, error } = await supabase
    .from('progress')
    .upsert({
      user_id: userId,
      stats,
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  if (error) throw error
  return data
}
