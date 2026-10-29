import { useAuth } from '../contexts/AuthContext'
import { getFlashcards, getNotes, getProgress } from '../lib/database'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [notes, setNotes] = useState([])
  const [progress, setProgress] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [user])

  const loadData = async () => {
    try {
      const [fcards, nts, prog] = await Promise.all([
        getFlashcards(user.id),
        getNotes(user.id),
        getProgress(user.id)
      ])
      setFlashcards(fcards || [])
      setNotes(nts || [])
      setProgress(prog)
    } catch (err) {
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0b0f14',
        color: '#e8eef6'
      }}>
        Chargement...
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0b0f14',
      color: '#e8eef6',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{
        background: '#141b24',
        padding: '1rem 2rem',
        borderBottom: '1px solid #2a3544',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, color: '#3b82f6' }}>
          Résidanat · Smart Learning
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#8b9cb3', fontSize: '0.9rem' }}>
            {user?.email}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: '#141b24',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #2a3544'
          }}>
            <h2 style={{ marginBottom: '0.5rem', color: '#10b981' }}>
              📚 Flashcards
            </h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              {flashcards.length}
            </p>
            <p style={{ color: '#8b9cb3', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
              Cartes enregistrées
            </p>
          </div>

          <div style={{
            background: '#141b24',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #2a3544'
          }}>
            <h2 style={{ marginBottom: '0.5rem', color: '#3b82f6' }}>
              📝 Notes
            </h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              {notes.length}
            </p>
            <p style={{ color: '#8b9cb3', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
              Notes enregistrées
            </p>
          </div>

          <div style={{
            background: '#141b24',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #2a3544'
          }}>
            <h2 style={{ marginBottom: '0.5rem', color: '#f59e0b' }}>
              📊 Progression
            </h2>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0 }}>
              {progress?.stats?.reviews || 0}
            </p>
            <p style={{ color: '#8b9cb3', fontSize: '0.85rem', margin: '0.5rem 0 0' }}>
              Révisions complétées
            </p>
          </div>
        </div>

        <div style={{
          background: '#141b24',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #2a3544'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>🚀 Prochaines étapes</h2>
          <ul style={{ color: '#8b9cb3', lineHeight: '1.8' }}>
            <li>Importer les cartes de l'application HTML existante</li>
            <li>Créer l'interface de révision avec SRS</li>
            <li>Ajouter les quiz et vrai/faux</li>
            <li>Implémenter les statistiques et gamification</li>
            <li>Ajouter le support des images</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
