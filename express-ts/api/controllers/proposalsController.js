const mongoose = require('mongoose');
const Proposal = require('../models/proposalSchema');

class ProposalsController {

    constructor() { }

    // Obtener todas las propuestas
    async getProposals() {
        // Utilizar el método find() de Mongoose para obtener todas las propuestas y ejecutar la consulta
        return Proposal.find().exec();
    }

    // Obtener una propuesta por su ID, poblada con información detallada de actividades
    async getProposalById(id) {
        // Utilizar el método findById() de Mongoose para obtener una propuesta por su ID
        // Poblar la propiedad 'activities' para obtener información detallada de las actividades asociadas a la propuesta
        return Proposal.findById(id).populate('activities').exec();
    }

    // Agregar una nueva propuesta con un nombre y una lista de actividades
    async addProposal(name, activities) {
        // Crear una nueva propuesta utilizando el método create() de Mongoose
        const newProposal = await Proposal.create({ name, activities });
        // Obtener información detallada de la nueva propuesta utilizando el método getProposalById()
        const proposal = await this.getProposalById(newProposal._id);
        // Devolver la información detallada de la nueva propuesta
        return proposal;
    }

    // Eliminar una propuesta por su ID
    async deleteProposal(id) {
        // Utilizar el método findByIdAndDelete() de Mongoose para eliminar una propuesta por su ID y ejecutar la consulta
        const result = await Proposal.findByIdAndDelete(id).exec();
        // Devolver un valor booleano indicando si se eliminó con éxito
        return !!result;
    }
}

module.exports = ProposalsController;
