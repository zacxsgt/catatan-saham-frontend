import ThousandInput from '../../components/ui/ThousandInput'

export default function BudgetInput({ value, onChange }) {
  return (
    <ThousandInput
      id="budget"
      label="Budget Anda (Rp)"
      placeholder="0"
      value={value}
      onChange={onChange}
      hint="Masukkan dana yang ingin diinvestasikan"
    />
  )
}