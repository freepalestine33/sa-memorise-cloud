import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isSignUp) {
        await signUp(email, password, fullName)
      } else {
        await signIn(email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0b0f14',
      color: '#e8eef6',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        background: '#141b24',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #2a3544',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ marginBottom: '0.5rem', color: '#3b82f6' }}>
          Résidanat · Smart Learning
        </h1>
        <p style={{ color: '#8b9cb3', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          {isSignUp ? 'Créer un compte' : 'Se connecter'}
        </p>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '0.6rem',
            borderRadius: '6px',
            marginBottom: '1rem',
            fontSize: '0.85rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#8b9cb3' }}>
                Nom complet
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom"
                required={!isSignUp}
                style={{
                  width: '100%',
                  padding: '0.6rem 0.8rem',
                  background: '#0b0f14',
                  border: '1px solid #2a3544',
                  borderRadius: '8px',
                  color: '#e8eef6',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#8b9cb3' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                background: '#0b0f14',
                border: '1px solid #2a3544',
                borderRadius: '8px',
                color: '#e8eef6',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', color: '#8b9cb3' }}>
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '0.6rem 0.8rem',
                background: '#0b0f14',
                border: '1px solid #2a3544',
                borderRadius: '8px',
                color: '#e8eef6',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.7rem',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Chargement...' : (isSignUp ? 'Créer le compte' : 'Se connecter')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#8b9cb3' }}>
          {isSignUp ? (
            <>
              Déjà un compte?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: pointer, textDecoration: 'underline' }}
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              Pas encore de compte?{' '}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: pointer, textDecoration: 'underline' }}
              >
                Créer un compte
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
