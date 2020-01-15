export const validarDataNascimento = input => {
    const dataNascimento = new Date(input.value);
    const dataAtual = new Date();

    const dataFaz18 = new Date(
        dataNascimento.getUTCFullYear() + 18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    );

    if (dataFaz18 > dataAtual) {
        input.setCustomValidity(true);
        return;
    }

    input.setCustomValidity(false);
    return;
}