import React, { useState } from "react";

// Types
type TierKey = "tier1" | "tier2" | "tier3";

interface Tier {
  key: TierKey;
  name: string;
  amount: number; // Naira
  weeklyRate: number; // decimal, e.g. 0.05
}

interface Member {
  id: string;
  name: string;
  tier: TierKey;
  principal: number;
  accumulatedInterest: number;
  weeks: number; // number of weeks elapsed
}

const TIERS: Record<TierKey, Tier> = {
  tier1: { key: "tier1", name: "Tier 1", amount: 10000, weeklyRate: 0.05 },
  tier2: { key: "tier2", name: "Tier 2", amount: 20000, weeklyRate: 0.1 },
  tier3: { key: "tier3", name: "Tier 3", amount: 30000, weeklyRate: 0.2 },
};

const MAX_MEMBERS = 12;

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export default function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [tierKey, setTierKey] = useState<TierKey>("tier1");
  const [error, setError] = useState<string | null>(null);
  const [compound, setCompound] = useState(false);

  // Derived totals
  const totalPrincipal = members.reduce((s, m) => s + m.principal, 0);
  const totalAccumulated = members.reduce(
    (s, m) => s + m.accumulatedInterest,
    0
  );
  const totalWithdrawable = totalPrincipal + totalAccumulated;

  // Add member
  function addMember() {
    setError(null);
    if (!name.trim()) {
      setError("Please enter a name.");
      return;
    }
    if (members.length >= MAX_MEMBERS) {
      setError("Group is full (12 members).");
      return;
    }
    const tier = TIERS[tierKey];

    // Tier validation: ensure the chosen tier's amount is fixed and no alternative allowed
    const principal = tier.amount;

    // Prevent duplicate names
    if (
      members.some((m) => m.name.toLowerCase() === name.trim().toLowerCase())
    ) {
      setError("A member with that name already exists.");
      return;
    }

    const newMember: Member = {
      id: uid("m_"),
      name: name.trim(),
      tier: tierKey,
      principal,
      accumulatedInterest: 0,
      weeks: 0,
    };

    setMembers((cur) => [...cur, newMember]);
    setName("");
  }

  // Simulate one week: add weekly interest for each member. Optionally compound principal.
  function simulateWeek() {
    setMembers((cur) =>
      cur.map((m) => {
        const tier = TIERS[m.tier];
        const interest = m.principal * tier.weeklyRate;
        const newAccum = m.accumulatedInterest + interest;
        const newPrincipal = compound ? m.principal + interest : m.principal;
        return {
          ...m,
          principal: newPrincipal,
          accumulatedInterest: compound ? m.accumulatedInterest : newAccum,
          weeks: m.weeks + 1,
        };
      })
    );
  }

  // Withdraw a member: remove and return their withdrawable amount
  function withdrawMember(id: string) {
    const mem = members.find((m) => m.id === id);
    if (!mem) return;
    const withdrawAmount = mem.principal + mem.accumulatedInterest;
    // Remove
    setMembers((cur) => cur.filter((m) => m.id !== id));
    alert(
      `${mem.name} withdrew ₦${formatNumber(
        withdrawAmount
      )} and left the group.`
    );
  }

  // Play game: apply 20% return on total principal and distribute proportionally to members based on principal share.
  function playGame() {
    if (members.length === 0) {
      setError("No members to play the game.");
      return;
    }
    setError(null);

    const total = members.reduce((s, m) => s + m.principal, 0);
    if (total <= 0) {
      setError("Total principal is zero.");
      return;
    }

    const gameReturn = total * 0.2; // 20% return on total principal

    // Distribute to accumulatedInterest proportionally to each member's principal share
    setMembers((cur) =>
      cur.map((m) => {
        const share = m.principal / total;
        const profit = gameReturn * share;
        return {
          ...m,
          accumulatedInterest: m.accumulatedInterest + profit,
        };
      })
    );
  }

  function formatNumber(n: number) {
    return n.toLocaleString("en-NG", { maximumFractionDigits: 2 });
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.h1}>AjoCircle — Play-to-Earn Simulation</h1>

      <section style={styles.card}>
        <h2>Register Student</h2>
        <div style={styles.row}>
          <label style={styles.label}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder='Student name'
          />
        </div>
        <div style={styles.row}>
          <label style={styles.label}>Tier</label>
          <select
            value={tierKey}
            onChange={(e) => setTierKey(e.target.value as TierKey)}
            style={styles.select}
          >
            {Object.values(TIERS).map((t) => (
              <option key={t.key} value={t.key}>
                {t.name} — ₦{formatNumber(t.amount)} — {t.weeklyRate * 100}
                %/week
              </option>
            ))}
          </select>
        </div>
        <div style={{ marginTop: 8 }}>
          <small>
            Note: tier amount is fixed. Selecting a tier sets the contribution
            automatically.
          </small>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <div style={{ marginTop: 10 }}>
          <button
            style={styles.btn}
            onClick={addMember}
            disabled={members.length >= MAX_MEMBERS}
          >
            Add Member
          </button>
        </div>
      </section>

      <section style={styles.card}>
        <h2>Controls</h2>
        <div style={styles.rowBetween}>
          <div>
            <button
              style={styles.btn}
              onClick={simulateWeek}
              disabled={members.length === 0}
            >
              Simulate 1 Week
            </button>
            <button
              style={{ ...styles.btn, marginLeft: 8 }}
              onClick={playGame}
              disabled={members.length === 0}
            >
              Run Play-to-Earn (20% on total principal)
            </button>
            <label style={{ marginLeft: 12 }}>
              <input
                type='checkbox'
                checked={compound}
                onChange={(e) => setCompound(e.target.checked)}
              />{" "}
              Compound weekly interest into principal
            </label>
          </div>
          <div>
            <strong>Members:</strong> {members.length} / {MAX_MEMBERS}
          </div>
        </div>
      </section>

      <section style={styles.card}>
        <h2>Savings Dashboard</h2>
        <div style={styles.rowBetween}>
          <div>
            <div>
              <strong>Total Principal:</strong> ₦{formatNumber(totalPrincipal)}
            </div>
            <div>
              <strong>Total Accumulated Interest:</strong> ₦
              {formatNumber(totalAccumulated)}
            </div>
            <div style={{ fontSize: 18 }}>
              <strong>Total Withdrawable:</strong> ₦
              {formatNumber(totalWithdrawable)}
            </div>
          </div>
          <div>
            <small>
              Each member's weekly interest is calculated from their tier rate
              applied to their principal.
            </small>
          </div>
        </div>

        <hr style={{ margin: "12px 0" }} />

        {members.length === 0 ? (
          <div>No members yet. Add students using the form above.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Tier</th>
                <th>Principal (₦)</th>
                <th>Weekly Interest (₦)</th>
                <th>Accumulated Interest (₦)</th>
                <th>Withdrawable (₦)</th>
                <th>Weeks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m, i) => {
                const tier = TIERS[m.tier];
                const weeklyInterest = m.principal * tier.weeklyRate;
                const withdrawable = m.principal + m.accumulatedInterest;
                return (
                  <tr key={m.id}>
                    <td>{i + 1}</td>
                    <td>{m.name}</td>
                    <td>{tier.name}</td>
                    <td>₦{formatNumber(m.principal)}</td>
                    <td>₦{formatNumber(weeklyInterest)}</td>
                    <td>₦{formatNumber(m.accumulatedInterest)}</td>
                    <td>₦{formatNumber(withdrawable)}</td>
                    <td>{m.weeks}</td>
                    <td>
                      <button
                        style={styles.smallBtn}
                        onClick={() => withdrawMember(m.id)}
                      >
                        Withdraw
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      <footer style={{ marginTop: 20, color: "#666" }}>
        <div>Notes:</div>
        <ul>
          <li>The app enforces fixed tier amounts and validates inputs.</li>
          <li>Use the "Simulate 1 Week" button to advance interest accrual.</li>
          <li>
            Use "Run Play-to-Earn" to simulate a group game return of 20% on
            total principal (distributed proportionally).
          </li>
        </ul>
      </footer>
    </div>
  );
}

// Styles with improved UX: responsive padding, better contrast, and hover effects
// These can be migrated to Tailwind classes for better performance
const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 980,
    margin: "28px auto",
    fontFamily: "Inter, Roboto, sans-serif",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  h1: {
    fontSize: 24,
    marginBottom: 12,
    color: "#1f2937",
    fontWeight: 700,
  },
  card: {
    border: "1px solid #e6e6e6",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    background: "#fff",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  },
  row: { display: "flex", alignItems: "center", gap: 8, marginTop: 8 },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { width: 80, fontWeight: 500, color: "#374151" },
  input: {
    padding: 8,
    flex: 1,
    borderRadius: 4,
    border: "1px solid #d1d5db",
    fontSize: 14,
    transition: "border-color 0.2s",
  },
  select: {
    padding: 8,
    borderRadius: 4,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },
  btn: {
    padding: "8px 12px",
    borderRadius: 6,
    border: "none",
    background: "#1f6feb",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    transition: "background-color 0.2s, transform 0.1s",
  },
  smallBtn: {
    padding: "6px 8px",
    borderRadius: 6,
    border: "none",
    background: "#ff6b6b",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: 13,
    transition: "background-color 0.2s, transform 0.1s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 14,
  },
  error: { marginTop: 8, color: "#b00020", fontWeight: 500 },
};
