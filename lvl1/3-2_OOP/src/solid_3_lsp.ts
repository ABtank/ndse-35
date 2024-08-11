// Принцип подстановки Барбары Лисков
// Необходимо, чтобы подклассы могли служить заменой для своих суперклассов



class EmployeeLSP {
    protected permissions: any = new Set<string>();

    public hasPermission(permissionName: string) {
        return this.permissions.has(permissionName);
    }

    public addPermission(permissionName: string) {
        return this.permissions.add(permissionName);
    }

}



class CashierLSP extends EmployeeLSP {


    protected permissions: string[] = []; // <--- так нельзя. Нарушает принцип. Подкласс перестает быть заменой для своего суперкласса

    public hasPermission(permissionName: string) {
        return this.permissions.push(permissionName);  // <--- так нельзя. Нарушает принцип. Подкласс перестает быть заменой для своего суперкласса
    }

}

function isPersonAllowedToDeleteProducts(person: EmployeeLSP) {
    return person.hasPermission('deleteProducts')
}

const employeeLSP = new EmployeeLSP();
employeeLSP.addPermission('deleteProducts');
isPersonAllowedToDeleteProducts(employeeLSP);

const cashierLSP = new CashierLSP();
cashierLSP.addPermission('deleteProducts');
isPersonAllowedToDeleteProducts(cashierLSP);
